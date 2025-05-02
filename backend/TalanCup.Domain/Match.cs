using System.ComponentModel.DataAnnotations.Schema;

namespace TalanCup.Domain;
public class Match
{
    public Guid MatchId { get; set; }
    public long StartDate { get; set; }
    public long EndDate { get; set; }

    [ForeignKey("FK_Match_Player_HomePlayer")]
    public Guid HomePlayerId { get; set; }
    public Player? HomePlayer { get; set; }

    [ForeignKey("FK_Match_Player_AwayPlayer")]
    public Guid AwayPlayerId { get; set; }
    public Player? AwayPlayer { get; set; }



}
