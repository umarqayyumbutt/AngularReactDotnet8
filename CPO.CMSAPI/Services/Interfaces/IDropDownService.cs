using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IDropDownService
    {
        List<sp_GetAllDropDownList> GetAllDropDownListAsync(string objName, int? id = null);
    }
}
