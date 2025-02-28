using InvelopApp.Server.Infrastructure;
using InvelopApp.Server.Domain;
using InvelopApp.Server.Application.Commands.Handlers;
using InvelopApp.Server.Application.Commands;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;

namespace InvelopApp.Tests.Application.Commands
{
    public class CreateContactHandlerTests
    {
        private readonly IMapper _mapper;
        private readonly DbContextOptions<AppDbContext> _options;

        public CreateContactHandlerTests()
        {
            // Use an isolated in-memory database for each test run
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())  // Ensures each test runs on a fresh DB
                .Options;

            // Configure AutoMapper for testing
            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<CreateContactCommand, Contact>());
            _mapper = mapperConfig.CreateMapper();
        }

        [Fact]
        public async Task Handle_Should_CreateContact_And_Return_Guid()
        {
            using var dbContext = new AppDbContext(_options);
            var handler = new CreateContactHandler(dbContext, _mapper);

            // Arrange
            var request = new CreateContactCommand("Ivo", "Nekov", DateTime.Now, "V", "0879060660", "Iban");

            // Act
            var result = await handler.Handle(request, CancellationToken.None);

            // Assert
            result.Should().NotBe(Guid.Empty);

            var savedContact = await dbContext.Contacts.FindAsync(result);
            savedContact.Should().NotBeNull();
            savedContact.FirstName.Should().Be(request.FirstName);
            savedContact.LastName.Should().Be(request.LastName);
            savedContact.PhoneNumber.Should().Be(request.PhoneNumber);
            savedContact.IBAN.Should().Be(request.IBAN);
        }
    }
}
