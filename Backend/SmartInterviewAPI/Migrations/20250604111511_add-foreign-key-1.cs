using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartInterviewAPI.Migrations
{
    /// <inheritdoc />
    public partial class addforeignkey1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAttempts_AspNetUsers_AppUserId",
                table: "UserAttempts");

            migrationBuilder.DropIndex(
                name: "IX_UserAttempts_AppUserId",
                table: "UserAttempts");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "UserAttempts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "UserAttempts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAttempts_AppUserId",
                table: "UserAttempts",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAttempts_AspNetUsers_AppUserId",
                table: "UserAttempts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
