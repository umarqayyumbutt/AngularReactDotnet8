using CPO.CMSAPI.Models;
using Microsoft.Data.SqlClient;

namespace CPO.CMSAPI.Interfaces
{
    public interface IStoreProcedureRepository
    {

        IEnumerable<sp_GetAllDropDownList> ExecuteDropDownStoredProcedureRawSql(List<SqlParameter> parameters, string storedProcedureName);
        //IEnumerable<object> ExecuteStoredProcedureSql(List<SqlParameter> parameters, string storedProcedureName)
    }
}
