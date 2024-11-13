using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CPO.CMSAPI.Migrations
{
    /// <inheritdoc />
    public partial class sp_GetAllDropDownList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE PROCEDURE sp_GetAllDropDownList
	-- Add the parameters for the stored procedure here
	@TableName Nvarchar,
	@id int=Null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF CHARINDEX('Province',@TableName) > 0
		BEGIN
			Select Id as id,Province_Name as name From Provinces
		END
	Else IF CHARINDEX('Region',@TableName) > 0
		BEGIN
			Select Id as id,Name as name From Regions
		END
	Else IF CHARINDEX('District',@TableName) > 0
		BEGIN
			Select Id as id,District_Name as name From Districts
		END
	Else IF CHARINDEX('Division',@TableName) > 0
		BEGIN
			Select Id as id,Division_Name as name From Divisions
		END
	Else IF CHARINDEX('Circle',@TableName) > 0
		BEGIN
			Select Id as id,Circle_Name as name From Circles
		END
	Else IF CHARINDEX('PoliceStation',@TableName) > 0
		BEGIN
			Select Id as id,PS_Name as name From PoliceStations
		END
END
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE [dbo].[sp_GetAllDropDownList]");
        }
    }
}
