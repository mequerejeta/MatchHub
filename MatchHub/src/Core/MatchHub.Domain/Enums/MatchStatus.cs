using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Domain.Enums
{
    public enum MatchStatus
    {
        Scheduled = 0,
        InProgress = 1,
        Completed = 2,
        Cancelled = 3
    }
}
