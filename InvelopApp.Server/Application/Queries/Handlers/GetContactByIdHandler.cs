using InvelopApp.Server.Infrastructure;
using InvelopApp.Server.Shared.Dtos;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace InvelopApp.Server.Application.Queries.Handlers
{
    public class GetContactByIdHandler : IRequestHandler<GetContactByIdQuery, ContactDto>
    {
        private readonly AppDbContext _context;

        public GetContactByIdHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ContactDto> Handle(GetContactByIdQuery request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FindAsync(request.id, cancellationToken);

            if (contact == null) return null;

            return new ContactDto { 
                Id = contact.Id, 
                FirstName = contact.FirstName, 
                LastName = contact.LastName, 
                DateOfBirth = contact.DateOfBirth, 
                Address = contact.Address,
                PhoneNumber = contact.PhoneNumber, 
                IBAN = contact.IBAN 
            };
        }
    }
}
