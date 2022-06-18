using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PDSACW.Infrastructure.Migrations
{
    public partial class removeendNodeshortestPathGame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndNode",
                table: "ShortestPathGame");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EndNode",
                table: "ShortestPathGame",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
