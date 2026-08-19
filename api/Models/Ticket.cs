namespace TicketingApi.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";       // Open | InProgress | Resolved | Closed
    public string Priority { get; set; } = "Medium";   // Low | Medium | High | Critical
    public string Category { get; set; } = "Other";    // Hardware | Software | Network | Account | Other
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
