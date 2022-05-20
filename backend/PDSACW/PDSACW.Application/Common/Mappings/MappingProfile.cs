using System.Reflection;
using AutoMapper;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVM>().ReverseMap();
           
        }
    }
   
}
