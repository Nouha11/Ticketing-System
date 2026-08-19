using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TicketingApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUsersAndJwt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    Priority = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "Priority", "Status", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "Network", new DateTime(2026, 8, 10, 9, 0, 0, 0, DateTimeKind.Utc), "I cannot connect to the company VPN since this morning. Error: timeout.", "High", "Open", "Cannot connect to VPN", null },
                    { 2, "Software", new DateTime(2026, 8, 11, 14, 30, 0, 0, DateTimeKind.Utc), "Microsoft Excel crashes every time I try to open a file larger than 5 MB.", "Medium", "InProgress", "Excel keeps crashing", null },
                    { 3, "Hardware", new DateTime(2026, 8, 12, 8, 0, 0, 0, DateTimeKind.Utc), "My current laptop is 5 years old and very slow. Requesting a replacement.", "Low", "Open", "Request new laptop", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FullName", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@ticketing.com", "Admin User", "$2a$11$PlcGmX0mYeEX1yU/gVdxCueS.zxI/GVjvbRXhqJR7zpgEEKuI54tO", "Admin" },
                    { 2, new DateTime(2026, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc), "agent@ticketing.com", "Support Agent", "$2a$11$Ru9NZ8ZyU2h9F3/euXJ0ve1hjh7lIlDK932o1WUkIH2G4qb/9gPYG", "Agent" },
                    { 3, new DateTime(2026, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc), "user@ticketing.com", "Regular User", "$2a$11$tB24ROgFbFQ3ezh0eX8QOuR0TY3SKubo5JP5IVBqH6O48oXwOtIbW", "User" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
