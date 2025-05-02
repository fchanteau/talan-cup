namespace TalanCup.Domain;
public class Player
{
    public Guid PlayerId { get; set; }
    public string NameTag { get; set; } = "";
    public string Team { get; set; } = "";
}
