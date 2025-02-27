using InvelopApp.Server.Infrastructure;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace InvelopApp.Server.Application.Commands.Handlers
{
    public class DeleteContactHandler : IRequestHandler<DeleteContactCommand, bool>
    {
        private readonly AppDbContext _context;

        public DeleteContactHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteContactCommand request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FindAsync(request.id, cancellationToken);

            if (contact == null) return false;

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
