using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Reflection.Emit;
using System.Reflection.Metadata;

namespace CPO.CMSAPI.Data
{
    public class CMSDbContext : IdentityDbContext<CMSUser,IdentityRole<int>,int>
    {
        public CMSDbContext(DbContextOptions<CMSDbContext> options)
       : base(options)
        {
        }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Circle> Circles { get; set; }
        public DbSet<PoliceStation> PoliceStations { get; set; }
        public DbSet<Beat> Beats { get; set; }
        public DbSet<ErrorLog> ErrorLogs { get; set; }

        private DbSet<RegionViewModel> RegionViewModels { get; set; }
        public DbSet<sp_GetAllDropDownList> DropDownListItems { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Region>()
            .HasOne(r => r.Province)
            .WithMany(p => p.Regions)
            .HasForeignKey(r => r.ProvinceId)
            .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Region>().Ignore(a => a.Province);

            modelBuilder.Entity<District>()
                .HasOne(d => d.Region)
                .WithMany(r => r.District)
                .HasForeignKey(d => d.RegionId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<District>().Ignore(a => a.Region);

            modelBuilder.Entity<Division>()
                .HasOne(d => d.District)
                .WithMany(d => d.Division)
                .HasForeignKey(d => d.DistrictId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Division>().Ignore(a => a.District);

            modelBuilder.Entity<Circle>()
                .HasOne(c => c.Division)
                .WithMany(d => d.Circle)
                .HasForeignKey(c => c.DivisionId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Circle>().Ignore(a => a.Division);

            modelBuilder.Entity<PoliceStation>()
                .HasOne(ps => ps.Circle)
                .WithMany(c => c.PoliceStation)
                .HasForeignKey(ps => ps.CircleId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<PoliceStation>().Ignore(a => a.Circle);
            //builder.Entity<Province>()
            // .HasMany(e => e.Regions)
            // .WithOne(e => e.Province)
            // .HasForeignKey(e => e.ProvinceId)
            // .IsRequired(false);

            modelBuilder.Entity<RegionViewModel>().HasNoKey()
            .ToView(null); // This line ensures EF Core won't try to map this entity to any table

            modelBuilder.Entity<sp_GetAllDropDownList>()
           .HasNoKey()
           .ToView(null); // This line ensures EF Core won't try to map this entity to any table

        }
        public async Task<List<RegionViewModel>> GetAllOrSingelRegionListAsync(params SqlParameter[] parameters)
        {
            var query = $"EXEC GetProvincesAndRegions ";
            query += string.Join(", ", parameters.Select(p => p.ParameterName));

            return await RegionViewModels.FromSqlRaw(query, parameters).ToListAsync();
            //return await RegionViewModels.FromSqlRaw("EXEC GetProvincesAndRegions",pa).ToListAsync();
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //modelBuilder.Entity<BlogHeader>()
        //    //    .HasOne(e => e.Blog)
        //    //.WithOne(e => e.Header)
        //    //    .HasForeignKey<BlogHeader>(e => e.BlogId)
        //    //    .IsRequired();
        //    //     modelBuilder.Entity<Province>()
        //    //.HasMany(c => c.Regions)
        //    //.WithOptional(c => c.Province)
        //    //.HasForeignKey(c => c.)
        //    //.WillCascadeOnDelete(false);
        //    modelBuilder.Entity<Province>()
        //     .HasMany(e => e.Regions)
        //     .WithOne(e => e.Province)
        //     .HasForeignKey(e => e.ProvinceId)
        //     .IsRequired(false);
        //}


    }
}
