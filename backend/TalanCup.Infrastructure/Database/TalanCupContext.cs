using Microsoft.EntityFrameworkCore;
using TalanCup.Application.Common;
using TalanCup.Domain;

namespace TalanCup.Infrastructure.Database;
public class TalanCupContext : DbContext, ITalanCupContext
{
    public TalanCupContext()
    {

    }

    public TalanCupContext(DbContextOptions<TalanCupContext> options) : base(options)
    {

    }

    public virtual DbSet<Player> Players { get; set; }
    public virtual DbSet<Match> Matchs { get; set; }



}
