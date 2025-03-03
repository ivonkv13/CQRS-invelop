using FluentValidation;
using InvelopApp.Server.Application.Commands;

namespace InvelopApp.Server.Application.Validators
{
    public class CreateContactValidator : AbstractValidator<CreateContactCommand>
    {
        public CreateContactValidator()
        {
            RuleFor(c => c.FirstName)
            .NotEmpty().WithMessage("First name is required.");

            RuleFor(c => c.LastName)
                .NotEmpty().WithMessage("Last name is required.");

            RuleFor(c => c.DateOfBirth)
                .NotEmpty().WithMessage("Date of birth is required.")
                .LessThan(DateTime.UtcNow).WithMessage("Date of birth must be in the past.");

            RuleFor(c => c.Address)
                .NotEmpty().WithMessage("Address is required.");

            RuleFor(c => c.PhoneNumber)
                .NotEmpty().WithMessage("phone number is required.")
                .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format.");

            RuleFor(c => c.IBAN)
                .NotEmpty().WithMessage("IBAN is required.")
                .Matches(@"^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$").WithMessage("Invalid IBAN format.");
        }
    }
}
