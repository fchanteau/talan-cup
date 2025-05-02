using TalanCup.Application.Features.Matchs.Dto;

namespace TalanCup.Contracts;
public class MatchResponse
{
    public Guid MatchId { get; }
    public long StartDate { get; }
    public long EndDate { get; }
    public Guid HomePlayerId { get; }
    public Guid AwayPlayerId { get; }

    private MatchResponse()
    {

    }

    private MatchResponse(Guid matchId, long startDate, long endDate, Guid homePlayerId, Guid awayPlayerId)
    {
        MatchId = matchId;
        StartDate = startDate;
        EndDate = endDate;
        HomePlayerId = homePlayerId;
        AwayPlayerId = awayPlayerId;
    }

    public static MatchResponse FromDto(MatchDto match)
    {
        return new MatchResponse(match.MatchId, match.StartDate, match.EndDate, match.HomePlayerId, match.AwayPlayerId);
    }
}
