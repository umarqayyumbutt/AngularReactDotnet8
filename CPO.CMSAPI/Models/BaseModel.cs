namespace CPO.CMSAPI.Models
{
    public class BaseModel
    {
        protected BaseModel()
        {
            CreatedDate = DateTime.Now;
        }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public bool IsDeleted { get; set; }= false;
        public bool IsActive { get; set; } = false;
    }
}
