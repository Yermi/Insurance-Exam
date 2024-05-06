using AutoMapper;
using Data.Models;
using Exam.Domain.DTO;

namespace Exam.Services.mappers
{
    public class GeneralMapper: Profile
    {
        public GeneralMapper()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<InsurancePolicy, InsurancePolicyDTO>();
            CreateMap<InsurancePolicyDTO, InsurancePolicy>();
        }
    }
}
