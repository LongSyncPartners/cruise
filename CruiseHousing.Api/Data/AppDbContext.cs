using Microsoft.EntityFrameworkCore;
using CruiseHousing.Api.Models;

namespace CruiseHousing.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ImportFile> ImportFiles => Set<ImportFile>();

        public DbSet<User> Users => Set<User>();

        public DbSet<Job> Jobs => Set<Job>();
    }
}
