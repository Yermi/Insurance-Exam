using AutoMapper;
using Data.Models;
using Exam.Core.Interfaces;
using Exam.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Exam.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsurancePoliciesController : ControllerBase
    {
        private readonly IInsurancePolicyRepository _insurancePolicyRepository;
        private readonly IMapper _mapper;
        public InsurancePoliciesController(IInsurancePolicyRepository insurancePolicyRepository, IMapper mapper)
        {
            _insurancePolicyRepository = insurancePolicyRepository;
            _mapper = mapper;
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetInsurancePoliciesByUserId(string userId)
        {
            return Ok(_insurancePolicyRepository.GetInsurancePoliciesByUserId(userId));
        }

        [HttpGet("{id}")]
        public IActionResult GetInsurancePolicyById(string id)
        {
            var insurancePolicy = _insurancePolicyRepository.GetInsurancePolicyById(id);
            if (insurancePolicy == null)
            {
                return NotFound();
            }
            return Ok(insurancePolicy);
        }

        [HttpPost]
        public IActionResult AddInsurancePolicy(InsurancePolicyDTO insurancePolicy)
        {
            _insurancePolicyRepository.AddInsurancePolicy(_mapper.Map<InsurancePolicy>(insurancePolicy));
            return Ok();
        }

        [HttpPut("{policyId}")]
        public IActionResult UpdateInsurancePolicy([FromRoute] string policyId, [FromBody] InsurancePolicyDTO insurancePolicy)
        {
            var insurancePolicyToUpdate = _insurancePolicyRepository.GetInsurancePolicyById(policyId);
            if (insurancePolicyToUpdate == null)
            {
                return NotFound();
            }
            _mapper.Map(insurancePolicy, insurancePolicyToUpdate);
            _insurancePolicyRepository.UpdateInsurancePolicy(_mapper.Map<InsurancePolicy>(insurancePolicyToUpdate));
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteInsurancePolicy(string id)
        {
            _insurancePolicyRepository.DeleteInsurancePolicy(id);
            return Ok();
        }
    }
}
