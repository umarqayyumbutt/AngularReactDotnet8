using Microsoft.Data.SqlClient;

namespace CPO.CMSAPI.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(string id);
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task UpdateAsync(string id);
        Task UpdateAsync(int id);
        Task DeleteAsync(string id);
        Task DeleteAsync(int id);
        Task<IEnumerable<T>> ExecuteStoredProcedureAsync(string procedureName, params SqlParameter[] parameters);
    }
}
