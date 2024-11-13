using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CPO.CMSAPI.Models
{
    [Table("Complaints", Schema = "PITB")]
    public class Complaint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Complaint_Id { get; set; }

        public DateTime? EntryDate { get; set; }
        public int? Region_Id { get; set; }
        public int? District_Id { get; set; }
        public int? Division_Id { get; set; }
        public int? Circle_Id { get; set; }
        public int? PS_Id { get; set; }

        [MaxLength(50)]
        public string Ps_Name { get; set; }

        public byte? Registration_Level { get; set; }

        [MaxLength(250)]
        public string Person_Name { get; set; }

        [MaxLength(250)]
        public string Father_Name { get; set; }

        [MaxLength(100)]
        public string Person_Contact { get; set; }

        [MaxLength(100)]
        public string Person_Email { get; set; }

        [MaxLength(13)]
        public string Person_CNIC { get; set; }

        [MaxLength(1000)]
        public string Person_Address { get; set; }

        public byte? Person_Gender { get; set; }

        [MaxLength(250)]
        public string Guardian_Relation { get; set; }

        public int? Offense_id { get; set; }

        [MaxLength(50)]
        public string Offense_Name { get; set; }

        public int? Offense_Sub_id { get; set; }
        public DateTime? Incident_Date { get; set; }

        public byte? Assigned_To { get; set; }

        [MaxLength(250)]
        public string RelevantPoliceOfficer { get; set; }

        [MaxLength(50)]
        public string Officer_MobileNo { get; set; }

        [MaxLength(2000)]
        public string Incident_Report { get; set; }

        public bool? FIR_Status { get; set; }

        [MaxLength(100)]
        public string FIR_No { get; set; }

        [MaxLength(100)]
        public string NameIO { get; set; }

        [MaxLength(50)]
        public string DiaryNo { get; set; }

        [MaxLength(100)]
        public string Complaint_Record { get; set; }

        public int? Category_Id { get; set; }

        [MaxLength(50)]
        public string Complaint_Category { get; set; }

        public int? Complaint_Status_Id { get; set; }

        [MaxLength(20)]
        public string Complaint_Status { get; set; }

        public int? Source_Id { get; set; }

        [MaxLength(100)]
        public string Complaint_Source { get; set; }

        public DateTime? Created_Date { get; set; }

        public int? Created_By { get; set; }

        public DateTime? Completed_Date { get; set; }

        [MaxLength(1000)]
        public string Place_Of_Occurance { get; set; }

        [MaxLength(1000)]
        public string MahrarFile { get; set; }

        [MaxLength(3000)]
        public string Mahrar_Remarks { get; set; }

        public int? Updated_By { get; set; }

        public DateTime? Updated_DateTime { get; set; }

        public byte? Flag { get; set; }
        public int? Flagged_By { get; set; }
        public DateTime? Flagged_DateTime { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime? DisposalDateTime { get; set; }

        public int? DisposalInDays { get; set; }

        public DateTime? TransferedDateTime { get; set; }
        public bool? Escalateable { get; set; }
        public bool IsTransferred { get; set; }
        public int? TransferFromId { get; set; }
        public byte? TransferFromUserType { get; set; }
        public int? TransferredToId { get; set; }
        public byte? TransferredToUserType { get; set; }

        public bool HasCriminalRecord { get; set; }

        [MaxLength(250)]
        public string LastFollowUpRemarks { get; set; }

        public DateTime? LastFollowUpDateTime { get; set; }

        [MaxLength(50)]
        public string LastRemarksProvidedByUser { get; set; }

        public int? TotalFollowUpCount { get; set; }

        [MaxLength(50)]
        public string RapputNo { get; set; }

        public DateTime? RapputDateTime { get; set; }

        public int? Officer_Id { get; set; }

        [MaxLength(13)]
        public string Officer_CNIC { get; set; }

        public int? Ps_BeatId { get; set; }

        [MaxLength(50)]
        public string TransferredToDisplayName { get; set; }

        public int? Action_StatusId { get; set; }

        [MaxLength(150)]
        public string Action_StatusName { get; set; }

        [MaxLength(100)]
        public string Created_By_Username { get; set; }

        public byte? Filed_Request_Status { get; set; }

        public int? RejectionCount { get; set; }

        public float? Timeline_InHours { get; set; }

        public DateTime? Timeline_DateTime { get; set; }

        public bool? Timeline_Complianced { get; set; }

        [NotMapped] // Exclude computed columns from mapping
        public byte? ComplaintAt_Level { get; set; }
    }
}
