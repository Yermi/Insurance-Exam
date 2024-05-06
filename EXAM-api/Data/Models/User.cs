namespace Data.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<InsurancePolicy> InsurancePolicies { get; } = new List<InsurancePolicy>();
    }
}
