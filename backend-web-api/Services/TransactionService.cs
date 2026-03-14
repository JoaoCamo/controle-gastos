using backend_web_api.Data;
using backend_web_api.DTOs;
using backend_web_api.Enums;
using backend_web_api.Exceptions;
using backend_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_web_api.Services
{
    public class TransactionService(AppDatabaseContext context)
    {
        private readonly AppDatabaseContext _context = context;
        
        public async Task<List<Transaction>> GetAllAsync()
        {
            return await _context.TransactionDbSet.ToListAsync();
        }

        public async Task<Transaction?> GetByIdAsync(int id)
        {
            return await _context.TransactionDbSet.FindAsync(id);
        }

        public async Task<Transaction> CreateTransactionAsync(TransactionDto transactionDto)
        {
            Person? person = await _context.PersonDbSet.FindAsync(transactionDto.PersonId);

            if (person is { Age: < 18 } && transactionDto.Type == TransactionType.Income)
                throw new MinorIncomeException("Menores de 18 não podem ter renda");
            
            Category? category = await _context.CategoryDbSet.FindAsync(transactionDto.CategoryId);

            if (category != null && category.Purpose != CategoryPurpose.Both)
            {
                if ((int)category.Purpose != (int)transactionDto.Type)
                    throw new IncompatibleTypeException("Tipo de transação é incompativel com a categoria");
            }
            
            Transaction transaction = new Transaction()
            {
                Description = transactionDto.Description, 
                Amount =  transactionDto.Amount,
                Type = transactionDto.Type,
                PersonId = transactionDto.PersonId,
                CategoryId = transactionDto.CategoryId
            };
            
            _context.TransactionDbSet.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<bool> UpdateTransactionAsync(int id, TransactionDto transactionDto)
        {
            Transaction? transaction = await _context.TransactionDbSet.FindAsync(id);

            Person? person = await _context.PersonDbSet.FindAsync(transactionDto.PersonId);

            if (person is { Age: < 18 } && transactionDto.Type == TransactionType.Income)
                throw new MinorIncomeException("Menores de 18 não podem ter renda");
            
            Category? category = await _context.CategoryDbSet.FindAsync(transactionDto.CategoryId);

            if (category != null && category.Purpose != CategoryPurpose.Both)
            {
                if ((int)category.Purpose != (int)transactionDto.Type)
                    throw new IncompatibleTypeException("Tipo de transação é incompativel com a categoria");
            }
            
            if (transaction == null)
                return false;
            
            transaction.Description = transactionDto.Description;
            transaction.Amount = transactionDto.Amount;
            transaction.Type = transactionDto.Type;
            transaction.PersonId = transactionDto.PersonId;
            transaction.CategoryId = transactionDto.CategoryId;
            
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTransactionAsync(int id)
        {
            Transaction? transaction = await _context.TransactionDbSet.FindAsync(id);

            if (transaction == null)
                return false;
            
            _context.TransactionDbSet.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}