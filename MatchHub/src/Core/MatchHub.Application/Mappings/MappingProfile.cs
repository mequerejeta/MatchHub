using AutoMapper;
using MatchHub.Application.DTOs;
using MatchHub.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatchHub.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Match, MatchDto>().ReverseMap();
        }
    }
}
