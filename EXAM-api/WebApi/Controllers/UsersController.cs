using AutoMapper;
using Data.Models;
using Exam.Core.Interfaces;
using Exam.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Exam.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Users([FromQuery] bool InsurancePolicies)
        {
            return Ok(_userRepository.GetUsers(InsurancePolicies));
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(string id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(UserDTO user) 
        {
            _userRepository.AddUser(_mapper.Map<User>(user));
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromRoute] string id, [FromBody] UserDTO user)
        {
            var userToUpdate = _userRepository.GetUserById(id);
            if (userToUpdate == null)
            {
                return NotFound();
            }
            _mapper.Map(user, userToUpdate);
            _userRepository.UpdateUser(userToUpdate);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            if (id == default)
            {
                return BadRequest();
            }
            _userRepository.DeleteUser(id);
            return Ok();
        }
    }
}
