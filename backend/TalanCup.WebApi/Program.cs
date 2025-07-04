using Serilog;
using TalanCup.Application;
using TalanCup.Infrastructure;
using TalanCup.WebApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.AddWebInfrastructure(builder.Configuration);

builder.Services.AddApplication();
builder.AddInfrastructure(builder.Configuration);

builder.Host.UseSerilog();

var app = builder.Build();

// Configure the HTTP request pipeline.

await app.UseInfrastructureAsync();

app.UseWebInfrastructure(builder.Configuration);

app.Run();


