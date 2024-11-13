using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class DistrictViewModel
    {
        public int id { get; set; }
        public string districtname { get; set; }
        public string districtcode { get; set; }
        public string districturduname { get; set; }
        public int? regionid { get; set; }
        public int? provinceid { get; set; }
    }
}
