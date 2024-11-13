using Microsoft.AspNetCore.Identity; 
namespace CPO.CMSAPI.Models
{
    public class CMSUser : IdentityUser<int>
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public string UserId { get; set; }
        public string Resource_Name{get;set;}
        public string cellNo { get;set;}
        public int? ShiftId { get; set; }

        //public List<Province>? Provinces { get; set; }
        public int? ProvinceId { get; set; }
        //public List<Region>? Region { get; set; }
        public int? RegionId { get; set; }
        //public List<District>? District { get; set; }
        public int? DistrictId { get; set; }
        //public List<Division>? Division { get; set; }
        public int? DivisionId { get; set; }

        //public List<Circle>? Circle { get; set; }
        public int? CircleId { get; set; }

        //public List<PoliceStation>? PoliceStation { get; set; }
        //public int? PS_id { get; set; }

        //public List<Beat>? Beat { get; set; }
        public int? BeatId { get; set; }
        public bool IsDeleted {  get;set;} 
        public int CreatedBy { get;set;}
        public DateTime CreatedOn { get;set;} 
        public int ModifiedBy { get;set;}
        public DateTime ModifiedOn { get;set;}
    }
    //public class CMSUserLogin : IdentityUserLogin<int>
    //{
    //}
    //public class CMSUserRole : IdentityUserRole<int>
    //{
    //}
    //public class CMSUserClaim : IdentityUserClaim<int>
    //{
    //}
    //public class CMSRole : IdentityRole<int, CMSUserRole>
    //{
    //}
    //public class ApplicatonUserStore :
    //UserStore<CMSUser, CMSRole, int, CMSUserLogin, CMSUserRole, CMSUserClaim>
    //{
    //    public ApplicatonUserStore(ApplicationDbContext context)
    //        : base(context)
    //    {
    //    }
    //}
}
