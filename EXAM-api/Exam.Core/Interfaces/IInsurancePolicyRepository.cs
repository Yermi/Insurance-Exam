using Data.Models;

namespace Exam.Core.Interfaces
{
    public interface IInsurancePolicyRepository
    {
        InsurancePolicy? GetInsurancePolicyById(string id);
        IEnumerable<InsurancePolicy> GetInsurancePoliciesByUserId(string userId);
        void AddInsurancePolicy(InsurancePolicy insurancePolicy);
        void UpdateInsurancePolicy(InsurancePolicy insurancePolicy);
        void DeleteInsurancePolicy(string id);
    }
}
