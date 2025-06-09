using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartInterviewAPI.Migrations
{
    /// <inheritdoc />
    public partial class addAIfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "UserAttempts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "UserAttempts",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "UserAttempts");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "UserAttempts");
        }
    }
}
