using MediatR;

namespace InvelopApp.Server.Application.Commands
{
    public record CreateContactCommand(string FirstName, string LastName, DateTime DateOfBirth, string Address, string PhoneNumber, string IBAN) : IRequest<Guid>;
    
}
