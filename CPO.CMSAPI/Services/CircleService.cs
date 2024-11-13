using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class CircleService : ICircleService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CircleService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddCircleAsync(Circle circle)
        {
            await _unitOfWork.Circles.AddAsync(circle);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteCircleAsync(int id)
        {
            await _unitOfWork.Circles.DeleteAsync(id);
        }

        public async Task<IEnumerable<Circle>> GetAllCirclesAsync()
        {
            return await _unitOfWork.Circles.GetAllAsync();
        }

        public async Task<Circle> GetCircleByIdAsync(int id)
        {
            return await _unitOfWork.Circles.GetByIdAsync(id);
        }

        public async Task UpdateCircleAsync(Circle circle)
        {
            await _unitOfWork.Circles.UpdateAsync(circle);
            await _unitOfWork.SaveAsync();
        }
    }
}
