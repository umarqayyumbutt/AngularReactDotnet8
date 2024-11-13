using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPO.CMSAPI.Models
{
    public class Province : BaseModel
    {
        
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Province_Name { get; set; }
        public ICollection<Region> Regions { get; set; }
       // public List<CMSUser> CMSUsers { get; set; }
    }
}
