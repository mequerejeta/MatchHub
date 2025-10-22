using FluentValidation;
using MatchHub.Application.Features.Matches.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Validators
{
    public class CreateMatchRequestValidator : AbstractValidator<CreateMatchCommand>
    {
        public CreateMatchRequestValidator()
        {
            RuleFor(x => x.Request.Date)
                .GreaterThan(DateTime.UtcNow.AddHours(-1))
                .WithMessage("Match date must be in the future or present");

            RuleFor(x => x.Request.Location)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Request.PlayersPerTeam)
                .InclusiveBetween(1, 11);

            RuleFor(x => x.Request.TeamA)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Request.TeamB)
                .NotEmpty()
                .MaximumLength(100)
                .NotEqual(x => x.Request.TeamA);
        }
    }
}
