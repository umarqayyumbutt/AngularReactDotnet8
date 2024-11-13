using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPO.CMSAPI.Migrations
{
    /// <inheritdoc />
    public partial class addComplaintstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
            migrationBuilder.EnsureSchema(
                name: "PITB");

            migrationBuilder.CreateTable(
                name: "Complaints",
                schema: "PITB",
                columns: table => new
                {
                    Complaint_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Region_Id = table.Column<int>(type: "int", nullable: true),
                    District_Id = table.Column<int>(type: "int", nullable: true),
                    Division_Id = table.Column<int>(type: "int", nullable: true),
                    Circle_Id = table.Column<int>(type: "int", nullable: true),
                    PS_Id = table.Column<int>(type: "int", nullable: true),
                    Ps_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Registration_Level = table.Column<byte>(type: "tinyint", nullable: true),
                    Person_Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Father_Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Person_Contact = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Person_Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Person_CNIC = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Person_Address = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Person_Gender = table.Column<byte>(type: "tinyint", nullable: true),
                    Guardian_Relation = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Offense_id = table.Column<int>(type: "int", nullable: true),
                    Offense_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Offense_Sub_id = table.Column<int>(type: "int", nullable: true),
                    Incident_Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Assigned_To = table.Column<byte>(type: "tinyint", nullable: true),
                    RelevantPoliceOfficer = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Officer_MobileNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Incident_Report = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    FIR_Status = table.Column<bool>(type: "bit", nullable: true),
                    FIR_No = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NameIO = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DiaryNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Complaint_Record = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Category_Id = table.Column<int>(type: "int", nullable: true),
                    Complaint_Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Complaint_Status_Id = table.Column<int>(type: "int", nullable: true),
                    Complaint_Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Source_Id = table.Column<int>(type: "int", nullable: true),
                    Complaint_Source = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_By = table.Column<int>(type: "int", nullable: true),
                    Completed_Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Place_Of_Occurance = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    MahrarFile = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Mahrar_Remarks = table.Column<string>(type: "nvarchar(3000)", maxLength: 3000, nullable: false),
                    Updated_By = table.Column<int>(type: "int", nullable: true),
                    Updated_DateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Flag = table.Column<byte>(type: "tinyint", nullable: true),
                    Flagged_By = table.Column<int>(type: "int", nullable: true),
                    Flagged_DateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DisposalDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DisposalInDays = table.Column<int>(type: "int", nullable: true),
                    TransferedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Escalateable = table.Column<bool>(type: "bit", nullable: true),
                    IsTransferred = table.Column<bool>(type: "bit", nullable: false),
                    TransferFromId = table.Column<int>(type: "int", nullable: true),
                    TransferFromUserType = table.Column<byte>(type: "tinyint", nullable: true),
                    TransferredToId = table.Column<int>(type: "int", nullable: true),
                    TransferredToUserType = table.Column<byte>(type: "tinyint", nullable: true),
                    HasCriminalRecord = table.Column<bool>(type: "bit", nullable: false),
                    LastFollowUpRemarks = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    LastFollowUpDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastRemarksProvidedByUser = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalFollowUpCount = table.Column<int>(type: "int", nullable: true),
                    RapputNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RapputDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Officer_Id = table.Column<int>(type: "int", nullable: true),
                    Officer_CNIC = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Ps_BeatId = table.Column<int>(type: "int", nullable: true),
                    TransferredToDisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Action_StatusId = table.Column<int>(type: "int", nullable: true),
                    Action_StatusName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Created_By_Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Filed_Request_Status = table.Column<byte>(type: "tinyint", nullable: true),
                    RejectionCount = table.Column<int>(type: "int", nullable: true),
                    Timeline_InHours = table.Column<float>(type: "real", nullable: true),
                    Timeline_DateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Timeline_Complianced = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints", x => x.Complaint_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Complaints",
                schema: "PITB");
            
        }
    }
}
