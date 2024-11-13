using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.Data.SqlClient;

namespace CPO.CMSAPI.Services
{
    public class RegionService : IRegionService
    {
        private readonly IUnitOfWork _unitOfWork;
       
        public RegionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddRegionAsync(Region region)
        {
             _unitOfWork.Regions.AddAsync(region);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteRegionAsync(int id)
        {
             _unitOfWork.Regions.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<Region>> GetAllRegionsAsync()
        {
             return await _unitOfWork.Regions.GetAllAsync();
            //SqlParameter[] parameters;
            //parameters = new SqlParameter[] { new SqlParameter("@id", DBNull.Value) };
            //return await _unitOfWork.Regions.GetAllOrSingelRegionListAsync(parameters);
            //SqlParameter[] parameters;
            //parameters = new SqlParameter[] { new SqlParameter("@id", DBNull.Value) };
            //var parameter = new SqlParameter("@ProvinceName", DBNull.Value);
            //return await _unitOfWork.Regions.ExecuteStoredProcedureAsync("sp_AllRegionOrRegionId",parameters);
        }

        public async Task<Region> GetRegionByIdAsync(int id)
        {
            return await _unitOfWork.Regions.GetByIdAsync(id);
        }

        public async Task UpdateRegionAsync(Region region)
        {
             _unitOfWork.Regions.UpdateAsync(region);
            await _unitOfWork.SaveAsync();
        }
    }
}
