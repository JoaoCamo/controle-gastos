using backend_web_api.DTOs;
using backend_web_api.Exceptions;
using backend_web_api.Models;
using backend_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController(TransactionService transactionService) : ControllerBase
    {
        private readonly TransactionService _transactionService = transactionService;
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Transaction> transactionList = await _transactionService.GetAllAsync();
            return Ok(transactionList);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Transaction? transaction = await _transactionService.GetByIdAsync(id);

            if (transaction == null)
                return NotFound();
            
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]TransactionDto transactionDto)
        {
            try
            {
                Transaction transaction = await _transactionService.CreateTransactionAsync(transactionDto);
                return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
            }
            catch (MinorIncomeException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (IncompatibleTypeException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]TransactionDto transactionDto)
        {
            try
            {
                bool updated = await _transactionService.UpdateTransactionAsync(id, transactionDto);
                return updated ? NoContent() : NotFound();
            }
            catch (MinorIncomeException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (IncompatibleTypeException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted = await _transactionService.DeleteTransactionAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}