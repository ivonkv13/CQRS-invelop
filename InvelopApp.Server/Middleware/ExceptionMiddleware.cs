using InvelopApp.Server.Application.Common;
using FluentValidation;
using System.Text.Json;

namespace InvelopApp.Server.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, IHostEnvironment env)
        {
            _next = next;
            _env = env;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";

                context.Response.StatusCode = ex switch
                {
                    ValidationException => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError
                };

                object response = ex switch
                {
                    ValidationException validationException => new ErrorResponse
                    {
                        Success = false,
                        Message = null,
                        Errors = validationException.Errors
                            .Select(e => new { field = e.PropertyName, message = e.ErrorMessage })
                            .ToList(),
                        Details = null
                    },
                    _ => new ErrorResponse
                    {
                        Success = false,
                        Message = "Something went wrong.",
                        Errors = null,
                        Details = _env.IsDevelopment() ? ex.Message : null
                    }
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}
