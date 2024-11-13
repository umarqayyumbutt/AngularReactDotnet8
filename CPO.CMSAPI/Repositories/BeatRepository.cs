using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Repositories
{
    public class BeatRepository : Repository<Beat>, IBeatRepository
    {
        public BeatRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
