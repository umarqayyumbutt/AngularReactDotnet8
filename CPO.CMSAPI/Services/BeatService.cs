using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class BeatService : IBeatService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BeatService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddBeatAsync(Beat beat)
        {
            await _unitOfWork.Beats.AddAsync(beat);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteBeatAsync(int id)
        {
            await _unitOfWork.Beats.DeleteAsync(id);
        }

        public async Task<IEnumerable<Beat>> GetAllBeatsAsync()
        {
            return await _unitOfWork.Beats.GetAllAsync();
        }

        public async Task<Beat> GetBeatByIdAsync(int id)
        {
            return await _unitOfWork.Beats.GetByIdAsync(id);
        }

        public async Task UpdateBeatAsync(Beat beat)
        {
            await _unitOfWork.Beats.UpdateAsync(beat);
            await _unitOfWork.SaveAsync();
        }
    }
}
