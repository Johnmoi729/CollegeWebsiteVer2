using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<User> FindByUsernameAsync(string username);
        Task<User> FindByEmailAsync(string email);
        Task<IEnumerable<User>> GetUsersByRoleAsync(string role);
    }
}