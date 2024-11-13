using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    public class Beat : BaseModel
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string BeatName { get; set; }

        public string BeatNo { get; set; }
        public PoliceStation? PoliceStation { get; set; }
        public int? PoliceStationId { get; set; }
       // public List<CMSUser> CMSUsers { get; set; }
    }
}
