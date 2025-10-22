using AutoMapper;
using MatchHub.Application.DTOs;
using MatchHub.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Querys
{
    public class GetMatchByIdQuery(Guid id) : IRequest<MatchDto?>
    {
        public Guid Id { get; } = id;
    }
    internal class GetMatchByIdQueryHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<GetMatchByIdQuery, MatchDto?>
    {
        private readonly IMatchRepository _repository = repository;
        private readonly IMapper _mapper= mapper;

        public async Task<MatchDto?> Handle(GetMatchByIdQuery request, CancellationToken cancellationToken)
        {
            var match = await _repository.GetByIdAsync(request.Id);
            return match == null ? null : _mapper.Map<MatchDto>(match);
        }
    }
}
