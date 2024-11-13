using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class District : BaseModel
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string District_Name { get; set; }
        public string District_Code { get; set; }
        public string District_Urduname {get;set;}
        public Region Region { get; set; }
        public int? RegionId { get; set; }
        public List<Division>? Division { get; set; }
        // public List<Division> Division { get; set; }
        // public List<CMSUser> CMSUsers { get; set; }
    }
}
