using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace CPO.CMSAPI.Repositories
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly CMSDbContext  _context;
        private readonly UserManager<CMSUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        public UnitOfWork(CMSDbContext context, UserManager<CMSUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _context = context;
            _userManager = userManager;            
            _roleManager = roleManager;
            Users = new UserRepository(context, _userManager,roleManager);
            Regions = new RegionRepository(_context); // Initialize other repositories
            Districts = new DistrictRepository(_context); // Initialize other repositories
            Divisions = new DivisionRepository(_context); // Initialize other repositories
            Circles = new CircleRepository(_context); // Initialize other repositories
            PoliceStations = new PoliceStationRepository(_context); // Initialize other repositories
            Beats = new BeatRepository(_context); // Initialize other repositories
            Provinces=new ProvinceRepository(_context); // Initialize other repositories
            ErrorLogs = new ErrorLogRepository(_context); // Initialize other repositories
            StoreProcedures=new StoreProcedureRepository(_context);
        }
        public IUserRepository Users { get; private set;}
        public IRepository<Province> Provinces { get; private set; } // Other repositories
        public IRepository<Region> Regions { get; private set; } // Other repositories
        public IRepository<District> Districts { get; private set; } // Other repositories
        public IRepository<Division> Divisions { get; private set; } // Other repositories
        public IRepository<Circle> Circles { get; private set; } // Other repositories
        public IRepository<PoliceStation> PoliceStations { get; private set; } // Other repositories
        public IRepository<Beat> Beats { get; private set; } // Other repositories
        public IRepository<ErrorLog> ErrorLogs { get; private set; } // Other repositories
        public IStoreProcedureRepository StoreProcedures { get; private set; }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
