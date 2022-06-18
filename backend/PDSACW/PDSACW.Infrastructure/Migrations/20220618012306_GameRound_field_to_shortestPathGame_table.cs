using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PDSACW.Infrastructure.Migrations
{
    public partial class GameRound_field_to_shortestPathGame_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameRound",
                table: "ShortestPathGame",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GameRound",
                table: "ShortestPathGame");
        }
    }
}
