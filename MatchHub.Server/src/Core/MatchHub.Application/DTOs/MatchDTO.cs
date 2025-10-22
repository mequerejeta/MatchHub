using MatchHub.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.DTOs
{
    public class MatchDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int PlayersPerTeam { get; set; }
        public string TeamA { get; set; } = string.Empty;
        public string TeamB { get; set; } = string.Empty;
        public int? TeamAGoals { get; set; }
        public int? TeamBGoals { get; set; }
        public MatchStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
