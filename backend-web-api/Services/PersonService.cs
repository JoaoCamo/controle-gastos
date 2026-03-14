using backend_web_api.Data;
using backend_web_api.DTOs;
using backend_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_web_api.Services
{
    public class PersonService(AppDatabaseContext context)
    {
        private readonly AppDatabaseContext _context = context;

        public async Task<List<Person>> GetAllAsync()
        {
            return await _context.PersonDbSet.ToListAsync();
        }

        public async Task<List<Person>> GetAllWithTransactionsAsync()
        {
            return await _context.PersonDbSet.Include(p => p.Transactions).ToListAsync();
        }

        public async Task<Person?> GetByIdAsync(int id)
        {
            return await _context.PersonDbSet.FindAsync(id);
        }

        public async Task<Person> CreatePersonAsync(PersonDto personDto)
        {
            Person person = new Person() { Name = personDto.Name, Age = personDto.Age };
            _context.PersonDbSet.Add(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<bool> UpdatePersonAsync(int id, PersonDto personDto)
        {
            Person? person = await _context.PersonDbSet.FindAsync(id);

            if (person == null)
                return false;
            
            person.Name = personDto.Name;
            person.Age =  personDto.Age;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePersonAsync(int id)
        {
            Person? person = await _context.PersonDbSet.Include(p => p.Transactions).FirstOrDefaultAsync(p => p.Id == id);

            if (person == null)
                return false;
            
            _context.TransactionDbSet.RemoveRange(person.Transactions ?? []);
            _context.PersonDbSet.Remove(person);
            
            await _context.SaveChangesAsync();
            return true;
        }
    }
}