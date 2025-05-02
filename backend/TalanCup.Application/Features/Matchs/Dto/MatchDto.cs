using TalanCup.Domain;

namespace TalanCup.Application.Features.Matchs.Dto;
public class MatchDto
{
    public Guid MatchId { get; }
    public long StartDate { get; }
    public long EndDate { get; }
    public Guid HomePlayerId { get; }
    public Guid AwayPlayerId { get; }

    public MatchDto()
    {

    }

    public MatchDto(Guid matchId, long startDate, long endDate, Guid homePlayerId, Guid awayPlayerId)
    {
        MatchId = matchId;
        StartDate = startDate;
        EndDate = endDate;
        HomePlayerId = homePlayerId;
        AwayPlayerId = awayPlayerId;
    }

    public static MatchDto FromMatch(Match match)
    {
        return new MatchDto(match.MatchId, match.StartDate, match.EndDate, match.HomePlayerId, match.AwayPlayerId);
    }
}
