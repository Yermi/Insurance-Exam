using Data.Models;

namespace Exam.Core.Interfaces
{
    public interface IUserRepository
    {
        User? GetUserById(string id);
        IEnumerable<User> GetUsers(bool IncludeInsurancePolicies);
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(string id);

    }
}
