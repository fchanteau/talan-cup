using TalanCup.Application;
using TalanCup.Infrastructure;
using TalanCup.WebApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.AddWebInfrastructure();

builder.Services.AddApplication();
builder.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.EnvironmentName != "NSwag")
{
    await app.UseInfrastructureAsync();
}

app.UseWebInfrastructure(builder.Configuration);


app.Run();


