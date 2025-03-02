using InvelopApp.Server.Infrastructure;
using InvelopApp.Server.Shared.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InvelopApp.Server.Application.Queries.Handlers
{
    public class GetAllContactsHandler : IRequestHandler<GetAllContactsQuery, List<ContactDto>>
    {
        private readonly AppDbContext _context;

        public GetAllContactsHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ContactDto>> Handle(GetAllContactsQuery request, CancellationToken cancellationToken)
        {
            var contacts = await _context.Contacts
                .AsNoTracking()
                .Select(contact => new ContactDto
                {
                    Id = contact.Id,
                    FirstName = contact.FirstName,
                    LastName = contact.LastName,
                    DateOfBirth = contact.DateOfBirth,
                    Address = contact.Address,
                    PhoneNumber = contact.PhoneNumber,
                    IBAN = contact.IBAN
                })
                .ToListAsync(cancellationToken);

            return contacts ?? [];
        }
    }
}
