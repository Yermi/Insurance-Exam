using Exam.Domain.Validators;
using System.ComponentModel.DataAnnotations;

namespace Exam.Domain.DTO
{
    public class UserDTO
    {
        [Required]
        [ValidIsraelId]
        public string Id { get; set; }
        [Required, MaxLength(50)]
        public string Name { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}
