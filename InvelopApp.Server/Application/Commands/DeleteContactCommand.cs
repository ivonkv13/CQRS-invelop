using MediatR;

namespace InvelopApp.Server.Application.Commands
{
    public record DeleteContactCommand(Guid Id) : IRequest<bool>;
}
