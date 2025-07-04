using TalanCup.Shared.Enums;

namespace TalanCup.Domain;
public class Tournament
{
    public Guid TournamentId { get; set; }
    public string Name { get; set; } = "";
    public long StartDate { get; set; }
    public MatchDuration MatchDuration { get; set; } = MatchDuration.FifteenMinutes;

    public virtual ICollection<Player> Players { get; set; } = [];
}
