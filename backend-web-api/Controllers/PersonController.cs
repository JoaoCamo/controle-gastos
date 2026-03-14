using backend_web_api.DTOs;
using backend_web_api.Models;
using backend_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController(PersonService personService) : ControllerBase
    {
        private readonly PersonService _personService = personService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Person> personList = await _personService.GetAllAsync();
            return Ok(personList);
        }

        [HttpGet("with-transactions")]
        public async Task<IActionResult> GetAllWithTransactions()
        {
            List<Person> personList = await _personService.GetAllWithTransactionsAsync();
            return Ok(personList);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Person? person = await _personService.GetByIdAsync(id);

            if (person == null)
                return NotFound();
            
            return Ok(person);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PersonDto personDto)
        {
            Person person = await _personService.CreatePersonAsync(personDto);
            return CreatedAtAction(nameof(GetById), new { id = person.Id }, person);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]PersonDto personDto)
        {
            bool updated = await _personService.UpdatePersonAsync(id, personDto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted = await _personService.DeletePersonAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}