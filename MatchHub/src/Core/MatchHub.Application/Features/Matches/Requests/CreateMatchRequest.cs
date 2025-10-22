using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Features.Matches.Requests
{
    public class CreateMatchRequest
    {
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int PlayersPerTeam { get; set; }
        public string TeamA { get; set; }
        public string TeamB { get; set; }
    }
}
