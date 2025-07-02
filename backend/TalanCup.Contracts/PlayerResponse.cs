using TalanCup.Application.Features.Players.Dto;

namespace TalanCup.Contracts;
public class PlayerResponse
{
    public Guid PlayerId { get; set; }
    public string Firstname { get; set; } = "";
    public string Lastname { get; set; } = "";

    public static PlayerResponse FromDto(PlayerDto player)
    {
        return new PlayerResponse
        {
            PlayerId = player.PlayerId,
            Firstname = player.Firstname,
            Lastname = player.Lastname
        };
    }
}
