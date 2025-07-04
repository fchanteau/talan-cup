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
    public virtual DbSet<Tournament> Tournaments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tournament>()
            .HasMany(t => t.Players)
            .WithMany(p => p.Tournaments)
            .UsingEntity(j => j.ToTable("TournamentPlayers"));

        modelBuilder.Entity<Match>()
            .HasOne(m => m.HomePlayer)
            .WithMany()
            .HasForeignKey(m => m.HomePlayerId)
            .HasConstraintName("FK_Match_Player_HomePlayerId")
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.AwayPlayer)
            .WithMany()
            .HasForeignKey(m => m.AwayPlayerId)
            .HasConstraintName("FK_Match_Player_AwayPlayerId")
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.Tournament)
            .WithMany()
            .HasForeignKey(m => m.TournamentId)
            .HasConstraintName("FK_Match_Tournament_TournamentId")
            .OnDelete(DeleteBehavior.Restrict);


        base.OnModelCreating(modelBuilder);
    }

}
