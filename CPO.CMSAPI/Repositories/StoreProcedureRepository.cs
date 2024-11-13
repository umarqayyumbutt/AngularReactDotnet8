using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Data;
using System.Data.Common;

namespace CPO.CMSAPI.Repositories
{
    public class StoreProcedureRepository : IStoreProcedureRepository
    {
        private readonly CMSDbContext _context;
        public StoreProcedureRepository(CMSDbContext context)
        {
            _context = context;   
        }
         public IEnumerable<sp_GetAllDropDownList> ExecuteDropDownStoredProcedureRawSql(List<SqlParameter> parameters, string storedProcedureName)
        {
            // Build the SQL query string for the stored procedure execution
            var sqlQuery = "EXEC " + storedProcedureName + " ";

            // Append parameter names dynamically to the query
            sqlQuery += string.Join(", ", parameters.Select(p => p.ParameterName));

            // Execute the stored procedure and map the result to a list of objects
            var result = _context.Set<sp_GetAllDropDownList>()
                .FromSqlRaw(sqlQuery, parameters.ToArray())
                .AsNoTracking()   // Optionally disable change tracking for better performance
                .ToList();

            return result;
        }

        //IEnumerable<object> IStoreProcedureRepository.ExecuteStoredProcedureSql(List<SqlParameter> parameters, string storedProcedureName)
        //{
        //    var result = _context.Query(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        //    return result;
        //}
    }
}
