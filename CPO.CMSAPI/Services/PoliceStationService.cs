using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class PoliceStationService : IPoliceStationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PoliceStationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddPoliceStationAsync(PoliceStation policestation)
        {
            await _unitOfWork.PoliceStations.AddAsync(policestation);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeletePoliceStationAsync(int id)
        {
            await _unitOfWork.PoliceStations.DeleteAsync(id);
        }

        public async Task<IEnumerable<PoliceStation>> GetAllPoliceStationAsync()
        {
            return await _unitOfWork.PoliceStations.GetAllAsync();
        }

        public async Task<PoliceStation> GetPoliceStationByIdAsync(int id)
        {
            return await _unitOfWork.PoliceStations.GetByIdAsync(id);
        }

        public async Task UpdatePoliceStationAsync(PoliceStation policestation)
        {
            await _unitOfWork.PoliceStations.UpdateAsync(policestation);
            await _unitOfWork.SaveAsync();
        }
    }
}
