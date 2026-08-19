using Microsoft.EntityFrameworkCore;
using TicketingApi.Models;

namespace TicketingApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Ticket> Tickets => Set<Ticket>();
    public DbSet<User>   Users   => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique email constraint
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Seed 3 users (one per role) — passwords are all "Password123!"
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, FullName = "Admin User",  Email = "admin@ticketing.com",
                       PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                       Role = "Admin",  CreatedAt = new DateTime(2026, 8, 1, 0, 0, 0, DateTimeKind.Utc) },
            new User { Id = 2, FullName = "Support Agent", Email = "agent@ticketing.com",
                       PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                       Role = "Agent",  CreatedAt = new DateTime(2026, 8, 1, 0, 0, 0, DateTimeKind.Utc) },
            new User { Id = 3, FullName = "Regular User",  Email = "user@ticketing.com",
                       PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                       Role = "User",   CreatedAt = new DateTime(2026, 8, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        // Seed sample tickets
        modelBuilder.Entity<Ticket>().HasData(
            new Ticket
            {
                Id = 1, Title = "Cannot connect to VPN",
                Description = "I cannot connect to the company VPN since this morning. Error: timeout.",
                Status = "Open", Priority = "High", Category = "Network",
                CreatedAt = new DateTime(2026, 8, 10, 9, 0, 0, DateTimeKind.Utc)
            },
            new Ticket
            {
                Id = 2, Title = "Excel keeps crashing",
                Description = "Microsoft Excel crashes every time I try to open a file larger than 5 MB.",
                Status = "InProgress", Priority = "Medium", Category = "Software",
                CreatedAt = new DateTime(2026, 8, 11, 14, 30, 0, DateTimeKind.Utc)
            },
            new Ticket
            {
                Id = 3, Title = "Request new laptop",
                Description = "My current laptop is 5 years old and very slow. Requesting a replacement.",
                Status = "Open", Priority = "Low", Category = "Hardware",
                CreatedAt = new DateTime(2026, 8, 12, 8, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
