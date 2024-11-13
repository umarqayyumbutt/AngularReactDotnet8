using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Repositories
{
    public class ErrorLogRepository : Repository<ErrorLog>, IErrorLogRepository
    {
        public ErrorLogRepository(CMSDbContext context) : base(context)
        {
        }
    }
}
