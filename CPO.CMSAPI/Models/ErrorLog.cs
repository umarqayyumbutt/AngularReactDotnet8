namespace CPO.CMSAPI.Models
{
    public class ErrorLog
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        public string UserName { get; set; }
    }
}
