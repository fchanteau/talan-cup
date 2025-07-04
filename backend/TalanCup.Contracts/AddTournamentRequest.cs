using System.ComponentModel.DataAnnotations;
using TalanCup.Shared.Enums;

namespace TalanCup.Contracts;
public class AddTournamentRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public long StartDate { get; set; }

    [Required]
    public MatchDuration MatchDuration { get; set; }
}
