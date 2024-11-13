using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Repositories
{
    public class PoliceStationRepository : Repository<PoliceStation>, IPoliceStationRepository
    {
        public PoliceStationRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
