
using InvelopApp.Server.Application.Commands;
using InvelopApp.Server.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InvelopApp.Server.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetContactById(Guid id)
        {
            var contact = await _mediator.Send(new GetContactByIdQuery(id));

            if (contact == null) return NotFound($"No contact with this ID is found - {id}");

            return Ok(contact);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _mediator.Send(new GetAllContactsQuery());

            return Ok(contacts);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateContact([FromBody] CreateContactCommand command)
        {
            var contact = await _mediator.Send(command);

            if (contact is null) return BadRequest();

            return Created("", contact);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, [FromBody] UpdateContactCommand command)
        {

            if (id != command.Id)
            {
                return BadRequest($"ID {id} in URL and body {command.Id} must match.");
            }

            var contact = await _mediator.Send(command);

            if (contact is null)
            {
                return NotFound($"No contact with this ID is found - {id}");
            }

            return Ok(contact);

        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id)
        {
            var success = await _mediator.Send(new DeleteContactCommand(id));

            if (!success)
            {
                return NotFound($"Something went wrong! Either the contact with {id} is missing or have already beem deleted.");
            }

            return Ok(id);
        }

        [HttpGet("Test")]
        public async Task<IActionResult> Test()
        {
            throw new NotImplementedException();
        }
    }
}
