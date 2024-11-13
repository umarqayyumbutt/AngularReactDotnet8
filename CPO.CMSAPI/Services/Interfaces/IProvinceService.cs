using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IProvinceService
    {
        Task<IEnumerable<Province>> GetAllProvincesAsync();
        Task<Province> GetProvinceByIdAsync(int id);
        Task AddProvinceAsync(Province province);
        Task UpdateProvinceAsync(Province province);
        Task DeleteProvinceAsync(int id);

    }
}
