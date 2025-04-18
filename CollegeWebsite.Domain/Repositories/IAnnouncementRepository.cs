using CollegeWebsite.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeWebsite.Domain.Repositories
{
    public interface IAnnouncementRepository : IRepositoryBase<Announcement>
    {
        Task<IEnumerable<Announcement>> GetLatestAnnouncementsAsync(int count);
        Task<IEnumerable<Announcement>> GetImportantAnnouncementsAsync();
    }
}