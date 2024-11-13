namespace CPO.CMSAPI.Models
{
    public class Register
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role{ get; set; }
        public string Password { get; set; }

        public string Resource_Name { get; set; }
        public string cellNo { get; set; }
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
        public int? PS_id { get; set; }

        //public List<Beat>? Beat { get; set; }
        public int? BeatId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
    }
}
