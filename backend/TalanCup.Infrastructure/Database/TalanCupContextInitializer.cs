using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TalanCup.Domain;

namespace TalanCup.Infrastructure.Database;
public class TalanCupContextInitializer(TalanCupContext dbContext, ILogger<TalanCupContextInitializer> logger)
{

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            await dbContext.Database.MigrateAsync(cancellationToken);
        }
        catch(Exception ex)
        {
            logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync(bool init, CancellationToken cancellationToken = default)
    {
        try
        {
            await TrySeedAsync(init, cancellationToken);
        }
        catch(Exception ex)
        {
            logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync(bool init, CancellationToken cancellationToken = default)
    {
        if(!init)
        {
            return;
        }

        dbContext.Matchs.RemoveRange(dbContext.Matchs);
        dbContext.Players.RemoveRange(dbContext.Players);

        await dbContext.SaveChangesAsync(cancellationToken);

        var players = new[] {
            InitPlayer("Aurélien", "Aston Villa"),
            InitPlayer("Simon", "Ath. Bilbao"),
            InitPlayer("Philippe", "Atlético Madrid"),
            InitPlayer("Alexis", "Brentford"),
            InitPlayer("Albin", "Brighton"),
            InitPlayer("Léon", "Chelsea"),
            InitPlayer("Manu", "Crystal Palace"),
            InitPlayer("Jess", "Dortmund"),
            InitPlayer("Julien", "Barcelone"),
            InitPlayer("Thomas", "Inter Milan"),
            InitPlayer("Maleaume", "Juventus"),
            InitPlayer("Geoffroy", "Leverkusen"),
            InitPlayer("Quentin", "Lille"),
            InitPlayer("Vianney", "Liverpool"),
            InitPlayer("Maxime", "Lyon"),
            InitPlayer("Pierre-yves", "Manchester City"),
            InitPlayer("Farah", "Manchester United"),
            InitPlayer("François", "Marseille"),
            InitPlayer("Camille", "Milan AC"),
            InitPlayer("Antoine", "Newcastle"),
            InitPlayer("Fabrice", "Nottingham"),
            InitPlayer("Sébastien", "Paris"),
            InitPlayer("Florian", "PSV"),
            InitPlayer("Sylvain", "Leipzig"),
            InitPlayer("Lucas", "Real Madrid"),
            InitPlayer("Dylan", "Real Sociedad"),
            InitPlayer("Dimitri", "Roma"),
            InitPlayer("Romain", "Stade Rennais"),
            InitPlayer("Teddy", "Tottenham Hotspur"),
            InitPlayer("Ayoub", "West Ham"),
        };

        dbContext.Players.AddRange(players);

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private Player InitPlayer(string nameTag, string teamName)
    {
        return new Player
        {
            PlayerId = Guid.NewGuid(),
            NameTag = nameTag,
            Team = teamName
        };
    }
}
