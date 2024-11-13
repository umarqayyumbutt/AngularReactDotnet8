using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class DistrictService : IDistrictService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DistrictService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddDistrictAsync(District district)
        {
            await _unitOfWork.Districts.AddAsync(district);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteDistrictAsync(int id)
        {
            await _unitOfWork.Districts.DeleteAsync(id);
            await _unitOfWork.SaveAsync();  
        }

        public async Task<IEnumerable<District>> GetAllDistrictsAsync()
        {
            return await _unitOfWork.Districts.GetAllAsync();
        }

        public async Task<District> GetDistrictByIdAsync(int id)
        {
            return await _unitOfWork.Districts.GetByIdAsync(id);
        }

        public async Task UpdateDistrictAsync(District district)
        {
            await _unitOfWork.Districts.UpdateAsync(district);
            await _unitOfWork.SaveAsync();
        }

        //public async Task<District> GetDistrictByIdAsync(int id)
        //{
        //    return await _unitOfWork.Districts.GetByIdAsync(id);
        //}
    }
}
