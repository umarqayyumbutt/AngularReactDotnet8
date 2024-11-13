using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CPO.CMSAPI.Repositories
{
    public class RegionRepository : Repository<Region>, IRegionRepository
    {
        private readonly CMSDbContext _context;
        public RegionRepository(CMSDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RegionViewModel>> GetAllOrSingelRegionListAsync(params SqlParameter[] parameters)
        {
            return await _context.GetAllOrSingelRegionListAsync(parameters);
        }
    }
}
