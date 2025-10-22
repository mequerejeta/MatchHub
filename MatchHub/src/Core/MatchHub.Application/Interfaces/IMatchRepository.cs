using MatchHub.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Interfaces
{
    public interface IMatchRepository
    {
        Task<Match?> GetByIdAsync(Guid id);
        Task<IEnumerable<Match>> GetAllAsync();
        Task<Match> AddAsync(Match match);
        Task UpdateAsync(Match match);
        Task DeleteAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
