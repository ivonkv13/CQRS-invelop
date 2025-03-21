﻿using InvelopApp.Server.Shared.Dtos;
using MediatR;

namespace InvelopApp.Server.Application.Commands
{
    public record UpdateContactCommand(Guid Id, string FirstName, string LastName, DateTime DateOfBirth, string Address, string PhoneNumber, string IBAN) : IRequest<ContactDto?>;
}
