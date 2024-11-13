using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class DivisionService : IDivisionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DivisionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddDivisionAsync(Division division)
        {
            await _unitOfWork.Divisions.AddAsync(division);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteDivisionAsync(int id)
        {
            await _unitOfWork.Divisions.DeleteAsync(id);
        }

        public async Task<IEnumerable<Division>> GetAllDivisionsAsync()
        {
            return await _unitOfWork.Divisions.GetAllAsync();
        }

        public async Task<Division> GetDivisionByIdAsync(int id)
        {
            return await _unitOfWork.Divisions.GetByIdAsync(id);
        }

        public async Task UpdateDivisionAsync(Division division)
        {
            await _unitOfWork.Divisions.UpdateAsync(division);
            await _unitOfWork.SaveAsync();
        }
    }
}
