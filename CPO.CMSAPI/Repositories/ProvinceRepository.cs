using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Repositories
{
    public class ProvinceRepository:Repository<Province>,IProvinceRepository
    {
        public ProvinceRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
