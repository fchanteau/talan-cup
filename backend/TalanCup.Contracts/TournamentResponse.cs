using TalanCup.Application.Features.Tournaments.Dto;

namespace TalanCup.Contracts;
public class TournamentResponse
{
    public Guid TournamentId { get; set; }
    public string Name { get; set; }
    public long StartDate { get; set; }

    public static TournamentResponse FromDto(TournamentDto tournament)
    {
        return new TournamentResponse
        {
            TournamentId = tournament.TournamentId,
            Name = tournament.Name,
            StartDate = tournament.StartDate
        };
    }
}
