using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace CPO.CMSAPI.Models
{
    [Authorize]
    public class Region : BaseModel
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int? ProvinceId { get; set; }
        public Province Province { get; set; }
        public List<District>? District { get; set; }
        // public List<CMSUser> CMSUsers { get; set; }
    }
}
