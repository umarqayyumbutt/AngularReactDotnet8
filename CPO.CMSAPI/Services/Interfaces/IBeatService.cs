using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IBeatService
    {
        Task<IEnumerable<Beat>> GetAllBeatsAsync();
        Task<Beat> GetBeatByIdAsync(int id);
        Task AddBeatAsync(Beat beat);
        Task UpdateBeatAsync(Beat beat);
        Task DeleteBeatAsync(int id);
    }
}
