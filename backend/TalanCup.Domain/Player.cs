using System.ComponentModel.DataAnnotations.Schema;

namespace TalanCup.Domain;
public class Player
{
    public Guid PlayerId { get; set; }
    public string Firstname { get; set; } = "";
    public string Lastname { get; set; } = "";

    public virtual ICollection<Tournament> Tournaments { get; set; } = [];

    [NotMapped]
    public string Login => $"{Firstname.ToLowerInvariant().Replace(" ", "")}#{Firstname.ToLowerInvariant()[0]}{Lastname.ToLowerInvariant()[0]}{Lastname.ToLowerInvariant()[^1]}";

    public Player()
    {
        PlayerId = Guid.NewGuid();
    }

    public Player(string firstname, string lastname)
    {
        PlayerId = Guid.NewGuid();
        Firstname = firstname;
        Lastname = lastname;
    }
}
