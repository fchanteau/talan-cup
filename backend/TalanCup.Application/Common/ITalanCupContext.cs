using Microsoft.EntityFrameworkCore;
using TalanCup.Domain;

namespace TalanCup.Application.Common;
public interface ITalanCupContext
{
    public DbSet<Player> Players { get; set; }
    public DbSet<Match> Matchs { get; set; }
    public DbSet<Tournament> Tournaments { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
