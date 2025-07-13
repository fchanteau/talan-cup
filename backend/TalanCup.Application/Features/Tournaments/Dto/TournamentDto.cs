namespace TalanCup.Application.Features.Tournaments.Dto;
public class TournamentDto
{
    public Guid TournamentId { get; set; }
    public string Name { get; set; } = "";
    public long StartDate { get; set; }
}
