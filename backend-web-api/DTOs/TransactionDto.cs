using backend_web_api.Enums;

namespace backend_web_api.DTOs;

public class TransactionDto
{
    public string Description { get; set; }

    public decimal Amount { get; set; }

    public TransactionType Type { get; set; }

    public int PersonId { get; set; }

    public int CategoryId { get; set; }
}