using AutoMapper;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Infrastructure;
using MediatR;

namespace InvelopApp.Server.Application.Commands.Handlers
{
    public class CreateContactHandler : IRequestHandler<CreateContactCommand, Contact>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CreateContactHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Contact> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = Contact.Create(request.FirstName, request.LastName, request.DateOfBirth, request.Address, request.PhoneNumber, request.IBAN);

            await _context.Contacts.AddAsync(contact, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return contact;
        }
    }
}
