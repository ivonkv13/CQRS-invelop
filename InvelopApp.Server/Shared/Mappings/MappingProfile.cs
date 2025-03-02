using AutoMapper;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Shared.Dtos;

namespace InvelopApp.Server.Shared.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>();
        }
    }
}
