using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IPoliceStationService
    {
        Task<IEnumerable<PoliceStation>> GetAllPoliceStationAsync();
        Task<PoliceStation> GetPoliceStationByIdAsync(int id);
        Task AddPoliceStationAsync(PoliceStation policestation);
        Task UpdatePoliceStationAsync(PoliceStation policestation);
        Task DeletePoliceStationAsync(int id);
    }
}
