using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using backend_web_api.Enums;

namespace backend_web_api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        [MaxLength(400)] public string Description { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public int PersonId { get; set; }
        public int CategoryId { get; set; }
        [JsonIgnore] public Person Person { get; set; }
        [JsonIgnore] public Category Category { get; set; }
    }
}