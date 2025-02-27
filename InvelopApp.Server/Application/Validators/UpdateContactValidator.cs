using FluentValidation;
using InvelopApp.Server.Application.Commands;

namespace InvelopApp.Server.Application.Validators
{
    public class UpdateContactValidator : AbstractValidator<UpdateContactCommand>
    {
        public UpdateContactValidator()
        {
            RuleFor(c => c.FirstName).NotEmpty().WithMessage("Contact name is required");
            RuleFor(c => c.LastName).NotEmpty().WithMessage("Contact name is required");
        }
    }
}
