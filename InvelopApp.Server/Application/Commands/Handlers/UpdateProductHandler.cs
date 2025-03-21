﻿using AutoMapper;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Infrastructure;
using InvelopApp.Server.Shared.Dtos;
using MediatR;

namespace InvelopApp.Server.Application.Commands.Handlers
{
    public class UpdateProductHandler : IRequestHandler<UpdateContactCommand, ContactDto?>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UpdateProductHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ContactDto?> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FindAsync(request.Id, cancellationToken);

            if (contact == null) return null;

            contact.Update(request.FirstName, request.LastName, request.DateOfBirth, request.Address, request.PhoneNumber, request.IBAN);

            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<Contact, ContactDto>(contact);

        }
    }
}
