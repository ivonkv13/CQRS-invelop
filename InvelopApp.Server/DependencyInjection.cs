using FluentValidation;
using InvelopApp.Server.Application.Behaviors;
using InvelopApp.Server.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace InvelopApp.Server
{
    public static class DependencyInjection
    {
        private static readonly string _connectionString = "DefaultConnection";
        public static WebApplicationBuilder AddServices(this WebApplicationBuilder builder)
        {
            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString(_connectionString)));

            // Register MediatR
            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            // Register Validators
            builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            // Register AutoMapper
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Register Validation Behavior
            builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Enable CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.WithOrigins("https://127.0.0.1:51308", "https://localhost:51308")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            return builder;
        }
    }
}
