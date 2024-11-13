using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class PoliceStationViewModel
    {
        public int id { get; set; }
        
        public string psname { get; set; }

        public string psabbr { get; set; }
        public string psurduname { get; set; }
        // public CMSUser CMSUser { get; set; }
        public int? regionid { get; set; }
        public int? provinceid { get; set; }
        public int? districtid { get; set; }
        public int? divisionid { get; set; }
        public int? circleid { get; set; }
    }
}
