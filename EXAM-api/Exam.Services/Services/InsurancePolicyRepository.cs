using Data;
using Data.Models;
using Exam.Core.Interfaces;

namespace Exam.Services.Services
{
    public class InsurancePolicyRepository : IInsurancePolicyRepository
    {
        private readonly DataContext _dbContext;
        public InsurancePolicyRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddInsurancePolicy(InsurancePolicy insurancePolicy)
        {
            _dbContext.InsurancePolicies.Add(insurancePolicy);
            _dbContext.SaveChanges();
        }

        public void DeleteInsurancePolicy(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }
            var insurancePolicy = GetInsurancePolicyById(id);
            if (insurancePolicy == null)
            {
                throw new Exception("insurance policy not found");
            }
            _dbContext.InsurancePolicies.Remove(insurancePolicy);
            _dbContext.SaveChanges();
        }

        public IEnumerable<InsurancePolicy> GetInsurancePoliciesByUserId(string userId)
        {
            return _dbContext.InsurancePolicies.Where(x => x.UserID == userId);
        }

        public InsurancePolicy? GetInsurancePolicyById(string id)
        {
            return _dbContext.InsurancePolicies?.Find(id);
        }

        public void UpdateInsurancePolicy(InsurancePolicy insurancePolicy)
        {
            if (insurancePolicy == null)
            {
                throw new ArgumentNullException(nameof(insurancePolicy));
            }
            _dbContext.InsurancePolicies.Update(insurancePolicy);
            _dbContext.SaveChanges();
        }
    }
}
