using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IDistrictService
    {
        Task<IEnumerable<District>> GetAllDistrictsAsync();
        Task<District> GetDistrictByIdAsync(int id);
        Task AddDistrictAsync(District district);
        Task UpdateDistrictAsync(District district);
        Task DeleteDistrictAsync(int id);
    }
}
