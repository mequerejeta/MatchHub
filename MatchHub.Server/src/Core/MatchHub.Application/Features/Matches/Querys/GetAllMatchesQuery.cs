using AutoMapper;
using MatchHub.Application.DTOs;
using MatchHub.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Querys
{
    public class GetAllMatchesQuery : IRequest<IEnumerable<MatchDto>>
    {
    }
    internal class GetAllMatchesQueryHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<GetAllMatchesQuery, IEnumerable<MatchDto>>
    {
        private readonly IMatchRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<MatchDto>> Handle(GetAllMatchesQuery request, CancellationToken cancellationToken)
        {
            var matches = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<MatchDto>>(matches);
        }
    }
}
