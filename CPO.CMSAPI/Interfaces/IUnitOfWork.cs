using CPO.CMSAPI.Models;

namespace CPO.CMSAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        IRepository<Province> Provinces { get; } // Add more repositories as needed
        IRepository<Region> Regions { get; } // Add more repositories as needed
        IRepository<District> Districts { get; }
        IRepository<Division> Divisions { get; }
        IRepository<Circle> Circles { get; }
        IRepository<PoliceStation> PoliceStations { get; }
        IRepository<Beat> Beats { get; }
        IRepository<ErrorLog> ErrorLogs { get; }
        IStoreProcedureRepository StoreProcedures { get; } // Add more repositories as needed
        Task SaveAsync();
        //Task<int> CompleteAsync();
    }
}
