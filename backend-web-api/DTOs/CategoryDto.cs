using backend_web_api.Enums;

namespace backend_web_api.DTOs
{
    public class CategoryDto
    {
        public string Description { get; set; }

        public CategoryPurpose Purpose { get; set; }
    }
}