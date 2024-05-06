using Data;
using Data.Models;
using Exam.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Exam.Services.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dbContext;
        public UserRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public void DeleteUser(string id)
        {
            if (id == default)
            {
                throw new ArgumentNullException(nameof(id));
            }
            var user = GetUserById(id);
            if (user == null)
            {
                throw new Exception("user not found");
            }
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }

        public User? GetUserById(string id)
        {
            return _dbContext.Users?.Include(user => user.InsurancePolicies).FirstOrDefault(user => user.Id == id);
        }

        public IEnumerable<User> GetUsers(bool IncludeInsurancePolicies)
        {
            return IncludeInsurancePolicies ? _dbContext.Users.Include(x => x.InsurancePolicies) : _dbContext.Users;
        }

        public void UpdateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }
    }
}
