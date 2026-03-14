using backend_web_api.Enums;

namespace backend_web_api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public CategoryPurpose Purpose { get; set; }
        public List<Transaction> Transactions { get; set; } = new();
    }
}