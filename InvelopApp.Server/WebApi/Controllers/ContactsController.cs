
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

            if (contact == null) return NotFound();

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
            {
                var contactId = await _mediator.Send(command);

                return CreatedAtAction(nameof(GetContactById), new { id = contactId }, null);
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateContact(Guid id, [FromBody] UpdateContactCommand command)
        {

            if (id != command.Id)
            {
                return BadRequest("ID in URL and body must match.");
            }

            var success = await _mediator.Send(command);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();

        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            var success = await _mediator.Send(new DeleteContactCommand(id));

            if (!success)
            {
                return NotFound("Something went wrong! Either the contact is missing or have already beem deleted.");
            }

            return NoContent();
        }
    }
}
