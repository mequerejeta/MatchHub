using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Requests
{
    public class RegisterResultRequest
    {
        public Guid MatchId { get; set; }
        public int TeamAGoals { get; set; }
        public int TeamBGoals { get; set; }
    }
}
