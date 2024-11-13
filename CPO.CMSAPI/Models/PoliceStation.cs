using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class PoliceStation : BaseModel
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string PS_Name { get; set; }
       
        public string PS_Abbr { get; set; }
        public string PS_Urduname { get; set; }
        // public CMSUser CMSUser { get; set; }
        public Circle Circle { get; set; }
        public int? CircleId { get; set; }
        public List<Beat> Beat { get; set; }
    }
}
