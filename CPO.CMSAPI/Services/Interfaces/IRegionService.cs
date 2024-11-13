using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IRegionService
    {
        Task<IEnumerable<Region>> GetAllRegionsAsync();
        Task<Region> GetRegionByIdAsync(int id);
        Task AddRegionAsync(Region region);
        Task UpdateRegionAsync(Region region);
        Task DeleteRegionAsync(int id);
    }
}
