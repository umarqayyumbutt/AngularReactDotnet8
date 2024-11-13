using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class Circle : BaseModel
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Circle_Name { get; set; }
       // public List<CMSUser> CMSUsers { get; set; }
       
        public string Circle_Urduname { get; set; }
        public string Abbr { get; set; }
        public Division Division { get; set; }
        public int? DivisionId { get; set; }
        public List<PoliceStation> PoliceStation { get; set; }
    }
}
