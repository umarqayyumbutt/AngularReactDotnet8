using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class Division : BaseModel
    {
       
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Division_Name { get; set; }
       
        public string Abbr { get; set; }
        public string Division_UrduName { get; set; }
        public District District { get; set; }
        public int? DistrictId { get; set; }

        public List<Circle> Circle { get; set; }
        // public List<CMSUser> CMSUsers { get; set; }
    }
}
