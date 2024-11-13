using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class ProvinceService : IProvinceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProvinceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddProvinceAsync(Province province)
        {
             _unitOfWork.Provinces.AddAsync(province);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteProvinceAsync(int id)
        {
            await _unitOfWork.Provinces.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<Province>> GetAllProvincesAsync()
        {
            return await _unitOfWork.Provinces.GetAllAsync();
        }

        public async Task<Province> GetProvinceByIdAsync(int id)
        {
            return await _unitOfWork.Provinces.GetByIdAsync(id);
        }

        public async Task UpdateProvinceAsync(Province province)
        {
             _unitOfWork.Provinces.UpdateAsync(province);
            await _unitOfWork.SaveAsync();
        }
    }
}
