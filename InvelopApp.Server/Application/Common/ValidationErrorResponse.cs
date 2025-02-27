using FluentValidation.Results;

namespace InvelopApp.Server.Application.Behaviors
{
    public class ValidationErrorResponse
    {
        public bool Success => false;
        public List<string> Errors { get; }

        public ValidationErrorResponse(List<ValidationFailure> failures)
        {
            Errors = failures.Select(f => f.ErrorMessage).ToList();
        }
    }
}