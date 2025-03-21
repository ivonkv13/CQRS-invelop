﻿using InvelopApp.Server.Shared.Dtos;
using MediatR;

namespace InvelopApp.Server.Application.Queries
{
    public record GetContactByIdQuery(Guid Id) : IRequest<ContactDto?>;
}
