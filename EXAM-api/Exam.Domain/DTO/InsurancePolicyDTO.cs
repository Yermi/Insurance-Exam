using System.ComponentModel.DataAnnotations;

namespace Exam.Domain.DTO
{
    public class InsurancePolicyDTO
    {
        [Required, StringLength(8), RegularExpression("([0-9]+)")]
        public string PolicyNumber { get; set; }
        [Required]
        public int InsuranceAmount { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string UserID { get; set; }
    }
}
