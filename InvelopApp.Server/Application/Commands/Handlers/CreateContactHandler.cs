﻿using AutoMapper;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Infrastructure;
using MediatR;

namespace InvelopApp.Server.Application.Commands.Handlers
{
    public class CreateContactHandler : IRequestHandler<CreateContactCommand, Guid>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CreateContactHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = _mapper.Map<Contact>(request);

            contact.Id = new Guid();

            await _context.Contacts.AddAsync(contact, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return contact.Id;
        }
    }
}
