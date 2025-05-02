using TalanCup.Application.Features.Players.Dto;

namespace TalanCup.Contracts;
public class PlayerResponse
{
    public Guid PlayerId { get; set; }
    public string NameTag { get; set; }
    public string Team { get; set; }

    public static PlayerResponse FromDto(PlayerDto player)
    {
        return new PlayerResponse
        {
            PlayerId = player.PlayerId,
            NameTag = player.TagName,
            Team = player.Team
        };
    }
}
