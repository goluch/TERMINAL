using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Common;

namespace Terminal.Backend.Infrastructure.DAL;

internal class UserDbContext(DbContextOptions<UserDbContext> options) : IdentityDbContext<ApplicationUser>(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql()
            .UseSnakeCaseNamingConvention();
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasDefaultSchema("users");
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .UseTphMappingStrategy()
            .HasDiscriminator<string>("RoleType")
            .HasValue<ApplicationRole>(nameof(ApplicationRole));

        builder.Entity<ApplicationRole>()
            .ToTable("AspNetRoles", schema: "users")
            .HasData(ApplicationRole.AvailableRoles);
    }
}
