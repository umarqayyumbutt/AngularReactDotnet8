using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface ICircleService
    {
        Task<IEnumerable<Circle>> GetAllCirclesAsync();
        Task<Circle> GetCircleByIdAsync(int id);
        Task AddCircleAsync(Circle circle);
        Task UpdateCircleAsync(Circle circle);
        Task DeleteCircleAsync(int id);
    }
}
