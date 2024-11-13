
using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
namespace CPO.CMSAPI.Repositories
{
    public class DivisionRepository : Repository<Division>, IDivisionRepository
    {
        public DivisionRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
