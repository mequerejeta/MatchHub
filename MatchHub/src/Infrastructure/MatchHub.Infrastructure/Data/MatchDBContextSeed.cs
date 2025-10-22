using MatchHub.Domain.Entities;
using MatchHub.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Infrastructure.Data
{
    public static class MatchDBContextSeed
    {
        public static async Task SeedAsync(MatchDbContext context)
        {
            if (context.Matches.Any())
                return;

            var matches = new List<Match>
        {
            new Match
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow.AddDays(3),
                Location = "Estadio Monumental",
                PlayersPerTeam = 11,
                TeamA = "River Plate",
                TeamB = "Boca Juniors",
                Status = MatchStatus.Scheduled,
                CreatedAt = DateTime.UtcNow
            },
            new Match
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow.AddDays(-2),
                Location = "Cancha del Barrio",
                PlayersPerTeam = 7,
                TeamA = "Los Amigos FC",
                TeamB = "Villa Devoto",
                Status = MatchStatus.Completed,
                TeamAGoals = 3,
                TeamBGoals = 2,
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                UpdatedAt = DateTime.UtcNow.AddDays(-2)
            },
            new Match
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow.AddDays(7),
                Location = "Complejo Deportivo Norte",
                PlayersPerTeam = 11,
                TeamA = "San Lorenzo",
                TeamB = "Independiente",
                Status = MatchStatus.Scheduled,
                CreatedAt = DateTime.UtcNow
            },
            new Match
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow.AddDays(-5),
                Location = "Polideportivo Sur",
                PlayersPerTeam = 5,
                TeamA = "Futsal Pro",
                TeamB = "Relámpagos FC",
                Status = MatchStatus.Completed,
                TeamAGoals = 5,
                TeamBGoals = 5,
                CreatedAt = DateTime.UtcNow.AddDays(-5),
                UpdatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new Match
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow.AddDays(1),
                Location = "Parque Centenario",
                PlayersPerTeam = 8,
                TeamA = "Racing Club",
                TeamB = "Vélez Sarsfield",
                Status = MatchStatus.Scheduled,
                CreatedAt = DateTime.UtcNow
            }
        };

            await context.Matches.AddRangeAsync(matches);
            await context.SaveChangesAsync();
        }
    }
}