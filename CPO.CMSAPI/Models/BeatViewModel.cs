namespace CPO.CMSAPI.Models
{
    public class BeatViewModel
    {
        public int id { get; set; }

        public string beatname { get; set; }

        public string beatno { get; set; }
        public int? regionid { get; set; }
        public int? provinceid { get; set; }
        public int? districtid { get; set; }
        public int? divisionid { get; set; }
        public int? circleid { get; set; }
        public int? policestationid { get; set; }
    }
}
