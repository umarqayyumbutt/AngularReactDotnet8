using CPO.CMSAPI.Models;
using Microsoft.Data.SqlClient;

namespace CPO.CMSAPI.Interfaces
{
    public interface IRegionRepository:IRepository<Region>
    {
        Task<IEnumerable<RegionViewModel>> GetAllOrSingelRegionListAsync(params SqlParameter[] parameters);
    }
}
