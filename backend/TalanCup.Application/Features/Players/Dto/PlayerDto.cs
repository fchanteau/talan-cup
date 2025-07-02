using TalanCup.Domain;

namespace TalanCup.Application.Features.Players.Dto;
public class PlayerDto
{
    public Guid PlayerId { get; set; }
    public string Firstname { get; set; } = "";
    public string Lastname { get; set; } = "";

    public PlayerDto()
    {

    }
    public PlayerDto(Guid playerId, string firstname, string lastname)
    {
        PlayerId = playerId;
        Firstname = firstname;
        Lastname = lastname;
    }

    public static PlayerDto FromPlayer(Player player)
    {
        return new PlayerDto(player.PlayerId, player.Firstname, player.Lastname);
    }
}