using CollegeWebsite.Domain.Entities;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IFeedbackRepository : IRepositoryBase<Feedback>
    {
        Task<long> CountUnreadAsync();
        Task<bool> MarkAsReadAsync(string id);
    }
}