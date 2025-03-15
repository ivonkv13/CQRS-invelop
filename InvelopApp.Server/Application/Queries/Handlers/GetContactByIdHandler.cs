using AutoMapper;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Infrastructure;
using InvelopApp.Server.Shared.Dtos;
using MediatR;

namespace InvelopApp.Server.Application.Queries.Handlers
{
    public class GetContactByIdHandler : IRequestHandler<GetContactByIdQuery, ContactDto?>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GetContactByIdHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ContactDto?> Handle(GetContactByIdQuery request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FindAsync(request.Id, cancellationToken);

            if (contact == null) return null;

            var contactDto = _mapper.Map<Contact, ContactDto>(contact);

            return contactDto;
        }
    }
}
