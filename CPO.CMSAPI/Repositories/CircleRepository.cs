using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Repositories
{
    public class CircleRepository : Repository<Circle>, ICircleRepository
    {
        public CircleRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
