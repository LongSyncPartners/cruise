using CruiseHousing.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ImportFile> ImportFiles => Set<ImportFile>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Job> Jobs => Set<Job>();

    public DbSet<Property> Properties => Set<Property>();
    public DbSet<PropertyIncomeExpenseMonthly> PropertyIncomeExpenseMonthlies => Set<PropertyIncomeExpenseMonthly>();
    public DbSet<PropertyIncomeExpenseDetail> PropertyIncomeExpenseDetails => Set<PropertyIncomeExpenseDetail>();

    public DbSet<ManagementType> ManagementTypes => Set<ManagementType>();
    public DbSet<PropertyType> PropertyTypes => Set<PropertyType>();
    public DbSet<PropertyStatus> PropertyStatuses => Set<PropertyStatus>();
    public DbSet<ProcessingStatus> ProcessingStatuses => Set<ProcessingStatus>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Role>()
            .HasIndex(x => x.Code)
            .IsUnique();

        modelBuilder.Entity<Property>(entity =>
        {
            entity.ToTable("properties");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id).HasColumnName("id");
            entity.Property(x => x.PropertyCode).HasColumnName("property_code").HasMaxLength(50).IsRequired();
            entity.Property(x => x.PropertyName).HasColumnName("property_name").HasMaxLength(255).IsRequired();
            entity.Property(x => x.PropertyAddress).HasColumnName("property_address").HasMaxLength(500);

            entity.Property(x => x.ManagementTypeCode).HasColumnName("management_type_code").HasMaxLength(50);
            entity.Property(x => x.PropertyTypeCode).HasColumnName("property_type_code").HasMaxLength(50);
            entity.Property(x => x.ManagementCompanyId).HasColumnName("management_company_id");

            entity.Property(x => x.ManagementStartDate).HasColumnName("management_start_date");
            entity.Property(x => x.ManagementEndDate).HasColumnName("management_end_date");
            entity.Property(x => x.ManagementDate).HasColumnName("management_date");

            entity.Property(x => x.PropertyStatusCode).HasColumnName("property_status_code").HasMaxLength(50);
            entity.Property(x => x.OwnerName).HasColumnName("owner_name").HasMaxLength(255);
            entity.Property(x => x.ProcessingStatusCode).HasColumnName("processing_status_code").HasMaxLength(50);

            entity.Property(x => x.CreatedAt).HasColumnName("created_at");
            entity.Property(x => x.CreatedBy).HasColumnName("created_by");
            entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
            entity.Property(x => x.UpdatedBy).HasColumnName("updated_by");
            entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            entity.Property(x => x.DeletedBy).HasColumnName("deleted_by");

            entity.HasIndex(x => x.PropertyCode).IsUnique();
        });

        modelBuilder.Entity<PropertyIncomeExpenseMonthly>(entity =>
        {
            entity.ToTable("property_income_expense_monthly");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id).HasColumnName("id");
            entity.Property(x => x.PropertyId).HasColumnName("property_id");
            entity.Property(x => x.TargetYearMonth).HasColumnName("target_year_month").HasMaxLength(6).IsRequired();

            entity.Property(x => x.ExpectedAmount).HasColumnName("expected_amount").HasColumnType("decimal(18,0)");
            entity.Property(x => x.ManagementCompanyAmount).HasColumnName("management_company_amount").HasColumnType("decimal(18,0)");
            entity.Property(x => x.ExecutedState).HasColumnName("executed_state");

            entity.Property(x => x.CreatedAt).HasColumnName("created_at");
            entity.Property(x => x.CreatedBy).HasColumnName("created_by");
            entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
            entity.Property(x => x.UpdatedBy).HasColumnName("updated_by");
            entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            entity.Property(x => x.DeletedBy).HasColumnName("deleted_by");

            entity.HasIndex(x => new { x.PropertyId, x.TargetYearMonth }).IsUnique();

            entity.HasOne(x => x.Property)
                .WithMany(x => x.MonthlyRecords)
                .HasForeignKey(x => x.PropertyId);
        });

        modelBuilder.Entity<PropertyIncomeExpenseDetail>(entity =>
        {
            entity.ToTable("property_income_expense_details");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id).HasColumnName("id");
            entity.Property(x => x.PropertyId).HasColumnName("property_id");
            entity.Property(x => x.TransactionDate).HasColumnName("transaction_date");

            entity.Property(x => x.Counterparty).HasColumnName("counterparty").HasMaxLength(255);
            entity.Property(x => x.Description).HasColumnName("description").HasMaxLength(500);

            entity.Property(x => x.IncomeAmount).HasColumnName("income_amount").HasColumnType("decimal(18,0)");
            entity.Property(x => x.ExpenseAmount).HasColumnName("expense_amount").HasColumnType("decimal(18,0)");
            entity.Property(x => x.BalanceAmount).HasColumnName("balance_amount").HasColumnType("decimal(18,0)");

            entity.Property(x => x.Note).HasColumnName("note");
            entity.Property(x => x.DisplayOrder).HasColumnName("display_order");

            entity.Property(x => x.CreatedAt).HasColumnName("created_at");
            entity.Property(x => x.CreatedBy).HasColumnName("created_by");
            entity.Property(x => x.UpdatedAt).HasColumnName("updated_at");
            entity.Property(x => x.UpdatedBy).HasColumnName("updated_by");
            entity.Property(x => x.DeletedAt).HasColumnName("deleted_at");
            entity.Property(x => x.DeletedBy).HasColumnName("deleted_by");

            entity.HasOne(x => x.Property)
                .WithMany(x => x.DetailRecords)
                .HasForeignKey(x => x.PropertyId);
        });

        modelBuilder.Entity<ManagementType>()
               .HasIndex(x => x.Code)
               .IsUnique();

        modelBuilder.Entity<PropertyType>()
            .HasIndex(x => x.Code)
            .IsUnique();

        modelBuilder.Entity<PropertyStatus>()
            .HasIndex(x => x.Code)
            .IsUnique();

        modelBuilder.Entity<ProcessingStatus>()
            .HasIndex(x => x.Code)
            .IsUnique();
    }
}