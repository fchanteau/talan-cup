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

        var players = new Player[] {
            new("Agnes", "LE ROUX"),
            new("Adeline", "CHAYE"),
            new("Albin", "QUERE"),
            new("Alexis", "EMERIAU"),
            new("Almamy Moustapha", "TOURE"),
            new("Antoine", "MADRE"),
            new("Antoine", "MARTEAU"),
            new("Axel", "DONNE"),
            new("Ayoub", "CHAHIR"),
            new("Bachir", "MOUAWAD"),
            new("Baptiste", "CARVAILLO"),
            new("Bruno", "MAHE DE LAVILLEGLE"),
            new("Carole", "JULE"),
            new("Celine", "BRUNIE"),
            new("Chloe", "HAYREAUD"),
            new("Cyril", "CARON"),
            new("Damien", "MENANTEAU"),
            new("Etienne", "BRASSIER"),
            new("Fabrice", "PIED"),
            new("Farah", "FAROUH"),
            new("Flavien", "SAUDEAU"),
            new("Francois", "CHANTEAU"),
            new("Francois", "SABBAGH"),
            new("Geoffroy", "BUREAU"),
            new("Georges", "MORERA VENTALLO"),
            new("Gwendal", "GUILLEMOTO"),
            new("Herve", "GUERIN"),
            new("Jasmine", "DENIS"),
            new("Jess", "PARISOT"),
            new("Julien", "BOTREL"),
            new("Julien", "VILLENEAU"),
            new("Karen", "PERCET"),
            new("Leon", "TER"),
            new("Lucas", "GOUTAUDIER"),
            new("Ludovic", "BRIAND"),
            new("Maleaume", "LEROUX"),
            new("Maxime", "ROPERO"),
            new("Mehdi", "BENCHAJI"),
            new("Mickael", "PATTE"),
            new("Pierre-Yves", "CAYLA"),
            new("Romain", "LEMETAYER"),
            new("Samuel", "POUILLOT"),
            new("Sebastien", "GAUTIER"),
            new("Simon", "ROY"),
            new("Soline", "PONSARD"),
            new("Stephane", "NAIGEON"),
            new("Sylvain", "FLEURET"),
            new("Thomas", "BITTON"),
            new("Valentin", "VACHON"),
            new("Vianney", "DALMAS"),
            new("Vianney", "NYS"),
            new("Vincent", "THONGDY"),
        };

        dbContext.Players.AddRange(players);

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
