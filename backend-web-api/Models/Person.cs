using System.ComponentModel.DataAnnotations;

namespace backend_web_api.Models
{
    public class Person
    {
        public int Id { get; set; }
        [MaxLength(200)] public string Name { get; set; }
        public int Age { get; set; }
        public List<Transaction> Transactions { get; set; } = new();
    }
}