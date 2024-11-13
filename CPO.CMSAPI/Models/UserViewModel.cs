namespace CPO.CMSAPI.Models
{
    public class UserViewModel
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public string UserId { get; set; }
        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string resourcename { get; set; }
        public string cellno { get; set; }
        public int? shiftid { get; set; }

        //public List<Province>? Provinces { get; set; }
        public int? provinceid { get; set; }
        //public List<Region>? Region { get; set; }
        public int? regionid { get; set; }
        //public List<District>? District { get; set; }
        public int? districtid { get; set; }
        //public List<Division>? Division { get; set; }
        public int? divisionid { get; set; }

        //public List<Circle>? Circle { get; set; }
        public int? circleid { get; set; }

        //public List<PoliceStation>? PoliceStation { get; set; }
        //public int? PS_id { get; set; }

        //public List<Beat>? Beat { get; set; }
        public int? beatid { get; set; }
        //public bool isdeleted { get; set; }
        //public int createdby { get; set; }
        //public DateTime createdon { get; set; }
        //public int modifiedby { get; set; }
        //public DateTime modifiedon { get; set; }
    }
}
