using AutoMapper;
using InvelopApp.Server.Infrastructure;
using MediatR;

namespace InvelopApp.Server.Application.Commands.Handlers
{
    public class UpdateProductHandler : IRequestHandler<UpdateContactCommand, bool>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UpdateProductHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FindAsync(request.Id, cancellationToken);

            if (contact == null) return false;

            contact = _mapper.Map(request, contact);

            await _context.SaveChangesAsync(cancellationToken);
            return true;

        }
    }
}
