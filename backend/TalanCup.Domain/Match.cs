namespace TalanCup.Domain;
public class Match
{
    public Guid MatchId { get; set; }
    public long StartDate { get; set; }
    public long EndDate { get; set; }

    public Guid HomePlayerId { get; set; }
    public Player? HomePlayer { get; set; }

    public Guid AwayPlayerId { get; set; }
    public Player? AwayPlayer { get; set; }

    public Guid TournamentId { get; set; }
    public Tournament? Tournament { get; set; }
}
