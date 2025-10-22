using AutoMapper;
using MatchHub.Application.DTOs;
using MatchHub.Application.Features.Matches.Requests;
using MatchHub.Application.Interfaces;
using MatchHub.Domain.Entities;
using MatchHub.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Commands
{
    public class RegisterResultCommand(RegisterResultRequest request) : IRequest<MatchDto>
    {
        public RegisterResultRequest Request { get; } = request;
    }
    internal class RegisterResultHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<RegisterResultCommand, MatchDto>
    {
        private readonly IMatchRepository _repository = repository;
        private readonly IMapper _mapper= mapper;

        public async Task<MatchDto> Handle(RegisterResultCommand command, CancellationToken cancellationToken)
        {
            var match = await _repository.GetByIdAsync(command.Request.MatchId);
            if (match == null)
                throw new KeyNotFoundException($"Match {command.Request.MatchId} not found");

            match = _mapper.Map<Match>(command.Request);
            match.Status = MatchStatus.Completed;
            match.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(match);
            return _mapper.Map<MatchDto>(match);
        }
    }
}
