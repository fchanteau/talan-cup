using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using TalanCup.WebApi.Infrastructure.Authentication;
using TalanCup.WebApi.Infrastructure.Cors;

namespace TalanCup.WebApi.Infrastructure;

public static class DependencyInjection
{
    public static void AddWebInfrastructure(this IHostApplicationBuilder builder, IConfiguration configuration)
    {
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

        builder.Services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });

        builder.Services.AddProblemDetails();

        builder.Services.AddOpenApiDocument(config =>
        {
            config.DocumentName = "v1";
            config.Title = "Talan Cup API";
            config.Version = "v1";
        });

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddTalanCupCors();
        builder.Services.AddTalanCupAuthentication(configuration);
    }

    public static void UseWebInfrastructure(this WebApplication app, IConfiguration configuration)
    {
        app.UseTalanCupCors(configuration);
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.UseOpenApi();
        app.UseSwaggerUi();
    }
}
