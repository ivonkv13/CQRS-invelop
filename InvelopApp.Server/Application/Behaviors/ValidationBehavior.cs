using FluentValidation;
using MediatR;

namespace InvelopApp.Server.Application.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var context = new ValidationContext<TRequest>(request);
            var failures = _validators
                .Select(v => v.Validate(context)) // Validate request
                .SelectMany(result => result.Errors) // Collect errors
                .Where(f => f != null) // Filter non-null errors
                .ToList();

            if (failures.Count > 0)
            {
                throw new ValidationException(failures); // ✅ Throw an exception instead
            }

            return await next(); // ✅ Proceed to the next handler
        }
    }
}
