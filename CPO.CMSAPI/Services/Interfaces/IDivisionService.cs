using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IDivisionService
    {
        Task<IEnumerable<Division>> GetAllDivisionsAsync();
        Task<Division> GetDivisionByIdAsync(int id);
        Task AddDivisionAsync(Division division);
        Task UpdateDivisionAsync(Division division);
        Task DeleteDivisionAsync(int id);
    }
}
