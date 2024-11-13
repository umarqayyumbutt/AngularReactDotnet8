namespace CPO.CMSAPI.Models
{
    public class CircleViewModel
    {
        public int id { get; set; }
        public string circlename { get; set; }

        public string circleurduname { get; set; }
        public string abbr { get; set; }
        public int? regionid { get; set; }
        public int? provinceid { get; set; }
        public int? districtid { get; set; }
        public int? divisionid { get; set; }
    }
}
