namespace CPO.CMSAPI.Models
{
    public class DivisionViewModel
    {
        public int id { get; set; }
        public string divisionname { get; set; }
        public string abbr { get; set; }
        public string divisionurduname { get; set; }        
        public int? provinceid { get; set; }
        public int? regionid { get; set; }
        public int? districtid { get; set; }
    }
}
