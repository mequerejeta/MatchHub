using MatchHub.Domain.Entities;
using MatchHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using MatchHub.Application.Interfaces;

namespace MatchHub.Infrastructure.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private readonly MatchDbContext _context;

        public MatchRepository(MatchDbContext context)
        {
            _context = context;
        }

        public async Task<Match?> GetByIdAsync(Guid id)
        {
            return await _context.Matches.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<IEnumerable<Match>> GetAllAsync()
        {
            return await _context.Matches.AsNoTracking().OrderByDescending(m => m.Date).ToListAsync();
        }

        public async Task<Match> AddAsync(Match match)
        {
            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
            return match;
        }

        public async Task UpdateAsync(Match match)
        {
            _context.Matches.Update(match);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match != null)
            {
                _context.Matches.Remove(match);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Matches.AnyAsync(m => m.Id == id);
        }
    }
}