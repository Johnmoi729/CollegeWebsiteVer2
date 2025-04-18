using CollegeWebsite.Application.DTOs;
using CollegeWebsite.Application.Interfaces;
using System.Threading.Tasks;

namespace CollegeWebsite.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardStatsDto> GetDashboardStatsAsync();
    }
}

