using MatchHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Infrastructure.Data
{
    public class MatchDbContext : DbContext
    {
        public MatchDbContext(DbContextOptions<MatchDbContext> options) : base(options) { }

        public DbSet<Match> Matches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Match>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Date).IsRequired();
                entity.Property(e => e.Location).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PlayersPerTeam).IsRequired();
                entity.Property(e => e.TeamA).IsRequired().HasMaxLength(100);
                entity.Property(e => e.TeamB).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Status).IsRequired().HasConversion<int>();
                entity.Property(e => e.CreatedAt).IsRequired();

                entity.HasIndex(e => e.Date);
                entity.HasIndex(e => e.Location);
            });
        }
    }
}