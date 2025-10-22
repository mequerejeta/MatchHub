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
    public class CreateMatchCommand(CreateMatchRequest request) : IRequest<MatchDto>
    {
        public CreateMatchRequest Request { get; } = request;
    }
    internal class CreateMatchHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<CreateMatchCommand, MatchDto>
    {
        private readonly IMatchRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<MatchDto> Handle(CreateMatchCommand command, CancellationToken cancellationToken)
        {
            var match = new Match
            {
                Id = Guid.NewGuid(),
                Status = MatchStatus.Scheduled,
                CreatedAt = DateTime.UtcNow
            };
            match = _mapper.Map<Match>(command.Request);
            var created = await _repository.AddAsync(match);
            return _mapper.Map<MatchDto>(created);
        }
    }
}
