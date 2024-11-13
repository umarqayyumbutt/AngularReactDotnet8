using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPO.CMSAPI.Migrations
{
    /// <inheritdoc />
    public partial class GetRegionListOrSingleRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE PROCEDURE sp_AllRegionOrRegionId	
	@id As Int=NULL
AS
BEGIN	
	SET NOCOUNT ON;   
	SELECT r.[Id] as id
      ,r.[Name] as name
      ,r.[ProvinceId] as prvoinceid
      ,r.[CreatedDate] as createddate
      ,r.[ModifiedDate] as modifieddate
      ,r.[CreatedBy] as createdby
      ,r.[ModifiedBy] as modifiedby
      ,r.[IsDeleted]as isdeleted
      ,r.[IsActive] As isactive
	  ,s.Province_Name As provincename
  FROM [PoliceReport].[dbo].[Regions] r
  INNER JOIN [PoliceReport].[dbo].[Provinces] s ON r.ProvinceId=s.Id
  Where r.Id=IsNULL(@id,r.id)
END");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE sp_AllRegionOrRegionId");
        }
    }
}
