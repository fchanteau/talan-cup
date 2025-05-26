using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TalanCup.Application.Common;

namespace TalanCup.Infrastructure.Database;
public static class DependencyInjection
{
    public static void AddDatabase(this IHostApplicationBuilder builder)
    {
        //builder.Services.AddDbContext<TalanCupContext>(options =>
        //    options.UseInMemoryDatabase(databaseName: "TalanCupDatabase"));

        builder.Services.AddDbContext<TalanCupContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("TalanCupDatabase")));


        builder.Services.AddScoped<TalanCupContextInitializer>();
        builder.Services.AddScoped<ITalanCupContext, TalanCupContext>();
    }

    public static async Task UseDatabaseAsync(this IHost host, CancellationToken cancellationToken = default)
    {
        using var scope = host.Services.CreateScope();
        var dbInitializer = scope.ServiceProvider.GetRequiredService<TalanCupContextInitializer>();

        var logger = scope.ServiceProvider.GetRequiredService<ILogger<TalanCupContextInitializer>>();

        logger.LogInformation("Initializing database");
        await dbInitializer.InitializeAsync(cancellationToken);

        logger.LogInformation("Seeding database");
        await dbInitializer.SeedAsync(true, cancellationToken);
    }
}
