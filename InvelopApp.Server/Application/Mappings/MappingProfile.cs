using AutoMapper;
using InvelopApp.Server.Application.Commands;
using InvelopApp.Server.Domain;

namespace InvelopApp.Server.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateContactCommand, Contact>();

            CreateMap<UpdateContactCommand, Contact>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}


