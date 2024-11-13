using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CPO.CMSAPI.Repositories
{
    public class DistrictRepository : Repository<District>, IDistrictRepository
    {
        private readonly CMSDbContext _context;
        public DistrictRepository(CMSDbContext context) : base(context)
        {
            _context = context; 
        }
        //public async Task<IEnumerable<DistrictViewModel>> GetAllDistrictsWithDetailsAsync()
        //{
        //    var districts = await _context.Districts
        //        .Include(d => d.Region)
        //        .Include(d => d.Region.Province)
        //        .Select(d => new DistrictViewModel
        //        {
        //            id = d.Id,
        //            districtname = d.District_Name,
        //            districtcode = d.District_Code,
        //             = d.Region.Name
        //        }).ToListAsync();

        //    return districts;
        //}
    }
}
