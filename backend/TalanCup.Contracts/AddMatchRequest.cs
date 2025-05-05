using System.ComponentModel.DataAnnotations;

namespace TalanCup.Contracts;
public class AddMatchRequest
{
    [Required]
    public long StartDate { get; set; }
    [Required]
    public long EndDate { get; set; }
    [Required]
    public Guid HomePlayerId { get; set; }
    [Required]
    public Guid AwayPlayerId { get; set; }
}
