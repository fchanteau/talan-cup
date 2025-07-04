using Serilog;

namespace TalanCup.WebApi.Infrastructure.Logging;

public static class DependencyInjection
{
    public static void AddLogging(this IHostApplicationBuilder builder)
    {
        var loggerConfig = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .Enrich.FromLogContext()
                .WriteTo.Console(outputTemplate:
                    "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} " +
                    "| TraceId: {TraceId} | SpanId: {SpanId} " +
                    "{NewLine}{Exception}");

        Log.Logger = loggerConfig.CreateLogger();
    }

    public static void UseLogging(this WebApplication app)
    {
        // Configure Serilog request logging
        app.UseSerilogRequestLogging();
    }
}
