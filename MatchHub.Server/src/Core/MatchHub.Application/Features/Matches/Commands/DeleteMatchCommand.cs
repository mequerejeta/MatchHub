using MatchHub.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Commands
{
    public class DeleteMatchCommand(Guid id) : IRequest<bool>
    {
        public Guid Id { get; } = id;
    }
    internal class DeleteMatchHandler(IMatchRepository repository) : IRequestHandler<DeleteMatchCommand, bool>
    {
        private readonly IMatchRepository _repository = repository;

        public async Task<bool> Handle(DeleteMatchCommand request, CancellationToken cancellationToken)
        {
            if (!await _repository.ExistsAsync(request.Id))
                return false;

            await _repository.DeleteAsync(request.Id);
            return true;
        }
    }
}
