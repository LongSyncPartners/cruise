using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Exceptions;

namespace CruiseHousing.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(
                "Validation error. Path={Path}, Message={Message}, TraceId={TraceId}",
                context.Request.Path,
                ex.Message,
                context.TraceIdentifier);

            await WriteErrorResponseAsync(
                context,
                ex.StatusCode,
                new ErrorResponseDto
                {
                    ErrorCode = ex.ErrorCode,
                    Message = ex.Message,
                    TraceId = context.TraceIdentifier,
                    Errors = ex.Errors
                });
        }
        catch (AppException ex)
        {
            _logger.LogWarning(
                "Application error. Path={Path}, ErrorCode={ErrorCode}, Message={Message}, TraceId={TraceId}",
                context.Request.Path,
                ex.ErrorCode,
                ex.Message,
                context.TraceIdentifier);

            await WriteErrorResponseAsync(
                context,
                ex.StatusCode,
                new ErrorResponseDto
                {
                    ErrorCode = ex.ErrorCode,
                    Message = ex.Message,
                    TraceId = context.TraceIdentifier
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Unhandled exception. Path={Path}, Method={Method}, TraceId={TraceId}",
                context.Request.Path,
                context.Request.Method,
                context.TraceIdentifier);

            var message = _environment.IsDevelopment()
                ? ex.Message
                : "Internal server error.";

            await WriteErrorResponseAsync(
                context,
                StatusCodes.Status500InternalServerError,
                new ErrorResponseDto
                {
                    ErrorCode = "INTERNAL_SERVER_ERROR",
                    Message = message,
                    TraceId = context.TraceIdentifier
                });
        }
    }

    private static async Task WriteErrorResponseAsync(
        HttpContext context,
        int statusCode,
        ErrorResponseDto response)
    {
        if (context.Response.HasStarted)
        {
            return;
        }

        context.Response.Clear();
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json; charset=utf-8";

        await context.Response.WriteAsJsonAsync(response);
    }
}