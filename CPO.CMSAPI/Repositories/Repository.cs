using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CPO.CMSAPI.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly CMSDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(CMSDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<T> GetByIdAsync(string id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task AddAsync(T entity)
        {
           await _dbSet.AddAsync(entity);  
        }
        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            _context.Entry(entity).State = EntityState.Modified;
           
        }
        public async Task UpdateAsync(string id)
        {
            var entity = await GetByIdAsync(id);
            _context.Entry(entity).State = EntityState.Modified;

        }
        public async Task UpdateAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            _context.Entry(entity).State = EntityState.Modified;

        }
        public async Task DeleteAsync(string id)
        {
            var entity=await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }
        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }
        public async Task<IEnumerable<T>> ExecuteStoredProcedureAsync(string procedureName, params SqlParameter[] parameters)
        {
            var query = $"EXEC {procedureName} ";
            query += string.Join(", ", parameters.Select(p => p.ParameterName));

            return await _dbSet.FromSqlRaw(query, parameters).ToListAsync();
        }





    }
}
