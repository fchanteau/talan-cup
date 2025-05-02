namespace TalanCup.Contracts;
public class AddMatchRequest
{
    public long StartDate { get; set; }
    public long EndDate { get; set; }
    public Guid HomePlayerId { get; set; }
    public Guid AwayPlayerId { get; set; }
}
