using backend_web_api.DTOs;
using backend_web_api.Models;
using backend_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController(CategoryService categoryService) : ControllerBase
    {
        private readonly CategoryService _categoryService = categoryService;
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Category> categoryList = await _categoryService.GetAllAsync();
            return Ok(categoryList);
        }

        [HttpGet("with-transactions")]
        public async Task<IActionResult> GetAllWithTransactions()
        {
            List<Category> categoryList = await _categoryService.GetAllWithTransactionsAsync();
            return Ok(categoryList);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Category? category = await _categoryService.GetByIdAsync(id);

            if (category == null)
                return NotFound();
            
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryDto categoryDto)
        {
            Category category = await _categoryService.CreateCategoryAsync(categoryDto);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]CategoryDto categoryDto)
        {
            bool updated = await _categoryService.UpdateCategoryAsync(id, categoryDto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted = await _categoryService.DeleteCategoryAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}