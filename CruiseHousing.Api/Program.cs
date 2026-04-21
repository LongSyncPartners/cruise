using CruiseHousing.Api.Data;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.Auth;
using CruiseHousing.Api.Features.ImportFiles;
using CruiseHousing.Api.Features.Masters;
using CruiseHousing.Api.Features.Properties;
using CruiseHousing.Api.Features.PropertyIncomeExpenseDetails;
using CruiseHousing.Api.Features.User;
using CruiseHousing.Api.Middlewares;
using CruiseHousing.Api.RabbitMQ;
using CruiseHousing.Api.Repositories;
using CruiseHousing.Api.Repositories.Implementations;
using CruiseHousing.Api.Repositories.Interfaces;
using CruiseHousing.Api.Security;
using CruiseHousing.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();
builder.Host.UseSerilog();

// Configure Entity Framework Core with MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.Configure<RabbitMqSetting>(
    builder.Configuration.GetSection("RabbitMq"));

// Add services to the container.
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IMasterDataService, MasterDataService>();

builder.Services.AddScoped<IManagementTypeRepository, ManagementTypeRepository>();
builder.Services.AddScoped<IProcessingStatusRepository, ProcessingStatusRepository>();
builder.Services.AddScoped<IPropertyStatusRepository, PropertyStatusRepository>();
builder.Services.AddScoped<IPropertyTypeRepository, PropertyTypeRepository>();


builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserSearchService, UserSearchService>();
builder.Services.AddScoped<IUserImportService, UserImportService>();
builder.Services.AddScoped<IUserExportService, UserExportService>();

builder.Services.AddScoped<JobRepository>();
builder.Services.AddScoped<JobService>();

builder.Services.AddScoped<ImportFileRepository>();
builder.Services.AddScoped<ImportFileService>();

builder.Services.AddScoped<JobQueuePublisher>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<CurrentUser>();

builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyIncomeExpenseMonthlyRepository, PropertyIncomeExpenseMonthlyRepository>();
builder.Services.AddScoped<IPropertyIncomeExpenseDetailRepository, PropertyIncomeExpenseDetailRepository>();

builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IPropertyIncomeExpenseMonthlyService, PropertyIncomeExpenseMonthlyService>();
builder.Services.AddScoped<IPropertyIncomeExpenseDetailService, PropertyIncomeExpenseDetailService>();

// Configure global model validation error handling
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var logger = context.HttpContext.RequestServices
            .GetRequiredService<ILogger<Program>>();

        var errors = context.ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                x => x.Key,
                x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
            );

        logger.LogWarning(
            "Validation failed Path={Path} Errors={@Errors}",
            context.HttpContext.Request.Path,
            errors);

        var response = new ErrorResponseDto
        {
            ErrorCode = "VALIDATION_ERROR",
            Message = "Validation failed.",
            TraceId = context.HttpContext.TraceIdentifier,
            Errors = errors
        };

        return new BadRequestObjectResult(response);
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CruiseHousing API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Input JWT folow : Bearer {your token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

/// Configure JWT authentication
var jwtSection = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSection["SecretKey"]!;
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtSection["Issuer"],

            ValidateAudience = true,
            ValidAudience = jwtSection["Audience"],

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(secretKey)),

            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                context.HandleResponse();

                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();

                var path = context.HttpContext.Request.Path;
                var method = context.HttpContext.Request.Method;
                var traceId = context.HttpContext.TraceIdentifier;
                var ip = context.HttpContext.Connection.RemoteIpAddress?.ToString();

                logger.LogWarning(
                    "Unauthorized access. Path={Path} Method={Method} TraceId={TraceId} IP={IP} Error={Error} ErrorDescription={ErrorDescription}",
                    path,
                    method,
                    traceId,
                    ip,
                    context.Error,
                    context.ErrorDescription);

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json; charset=utf-8";

                await context.Response.WriteAsJsonAsync(new ErrorResponseDto
                {
                    ErrorCode = "UNAUTHORIZED",
                    Message = "Authentication required.",
                    TraceId = traceId
                });
            },

            OnForbidden = async context =>
            {
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();

                var path = context.HttpContext.Request.Path;
                var method = context.HttpContext.Request.Method;
                var traceId = context.HttpContext.TraceIdentifier;
                var ip = context.HttpContext.Connection.RemoteIpAddress?.ToString();
                var userName = context.HttpContext.User.Identity?.Name;
                var userId = context.HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

                logger.LogWarning(
                    "Forbidden access. Path={Path} Method={Method} TraceId={TraceId} IP={IP} UserId={UserId} UserName={UserName}",
                    path,
                    method,
                    traceId,
                    ip,
                    userId,
                    userName);

                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json; charset=utf-8";

                await context.Response.WriteAsJsonAsync(new ErrorResponseDto
                {
                    ErrorCode = "FORBIDDEN",
                    Message = "You do not have permission to perform this action.",
                    TraceId = traceId
                });
            }
        };
    });

// DEV
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// PRODUCT
/**
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // FE URL
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // cookie/token
    });
});
 */

var app = builder.Build();

builder.Services.AddAuthorization();

// Configure Serilog request logging and global exception handling
app.UseSerilogRequestLogging();
app.UseExceptionHandler("/error");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
