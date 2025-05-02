using TalanCup.Domain;

namespace TalanCup.Application.Features.Players.Dto;
public class PlayerDto
{
    public Guid PlayerId { get; set; }
    public string TagName { get; set; }
    public string Team { get; set; }

    public PlayerDto()
    {

    }

    public PlayerDto(Guid playerId, string nameTag, string team)
    {
        PlayerId = playerId;
        TagName = nameTag;
        Team = team;
    }

    public static PlayerDto FromPlayer(Player player)
    {
        return new PlayerDto(player.PlayerId, player.NameTag, player.Team);
    }
}