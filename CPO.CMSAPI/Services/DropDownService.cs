using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CPO.CMSAPI.Services
{
    public class DropDownService : IDropDownService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DropDownService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public List<sp_GetAllDropDownList> GetAllDropDownListAsync(string tableName,int? id=0)
        {
            var parameters = new List<SqlParameter>
        {
            new SqlParameter("@TableName", SqlDbType.NVarChar) { Value = tableName },
            new SqlParameter("@id", SqlDbType.Int) { Value = id },
            //new SqlParameter("@Param3", SqlDbType.DateTime) { Value = DateTime.Now }
        };
            var listofdropdown =_unitOfWork.StoreProcedures.ExecuteDropDownStoredProcedureRawSql(parameters, "sp_GetAllDropDownList").ToList();
            //List<DropDownListViewModel> dropdownlist = new List<DropDownListViewModel>();
            //dropdownlist.Insert(0, new DropDownListViewModel() { id = 0, name = "Select an Option" });

            // listofdropdown.Select(a => new DropDownListViewModel() { id = a, name = a.name }).ToList();
            return listofdropdown;
        }
    }
}
