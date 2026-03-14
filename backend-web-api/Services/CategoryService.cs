using backend_web_api.Data;
using backend_web_api.DTOs;
using backend_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_web_api.Services
{
    public class CategoryService(AppDatabaseContext context)
    {
        private readonly AppDatabaseContext _context = context;
        
        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.CategoryDbSet.ToListAsync();
        }

        public async Task<List<Category>> GetAllWithTransactionsAsync()
        {
            return await _context.CategoryDbSet.Include(p => p.Transactions).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.CategoryDbSet.FindAsync(id);
        }

        public async Task<Category> CreateCategoryAsync(CategoryDto categoryDto)
        {
            Category category = new Category() { Description = categoryDto.Description, Purpose = categoryDto.Purpose };
            _context.CategoryDbSet.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            Category? category = await _context.CategoryDbSet.FindAsync(id);

            if (category == null)
                return false;

            category.Description = categoryDto.Description;
            category.Purpose = categoryDto.Purpose;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            Category? category = await _context.CategoryDbSet.FindAsync(id);

            if (category == null)
                return false;

            _context.CategoryDbSet.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}