using MatchHub.API.Middleware;
using MatchHub.Application;
using MatchHub.Infrastructure;
using MatchHub.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger configuration para .NET 9
builder.Services.AddOpenApi();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000") // Puerto de Next.js
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();



using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MatchDbContext>();
    await context.Database.EnsureCreatedAsync();
    await MatchDbContextSeed.SeedAsync(context);
}


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Endpoint de OpenAPI
    app.UseSwaggerUI(options => // UI de Swagger
    {
        options.SwaggerEndpoint("/openapi/v1.json", "MatchHub API v1");
    });
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program { }