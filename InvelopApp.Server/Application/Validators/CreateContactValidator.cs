using FluentValidation;
using InvelopApp.Server.Application.Commands;

namespace InvelopApp.Server.Application.Validators
{
    public class CreateContactValidator : AbstractValidator<CreateContactCommand>
    {
        public CreateContactValidator()
        {
            RuleFor(c => c.FirstName).NotEmpty().WithMessage("Contact first name is required");
            RuleFor(c => c.LastName).NotEmpty().WithMessage("Contact last name is required");
        }
    }
}
