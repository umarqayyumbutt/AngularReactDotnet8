namespace CPO.CMSAPI.Models
{
    public class RegionViewModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public int provinceid { get; set; }
        public string provincename { get; set; } = "";
        public int createdby { get; set; }
    }
}
