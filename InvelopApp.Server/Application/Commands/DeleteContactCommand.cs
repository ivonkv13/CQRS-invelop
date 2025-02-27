using MediatR;

namespace InvelopApp.Server.Application.Commands
{
    public record DeleteContactCommand(Guid id) : IRequest<bool>;
}
