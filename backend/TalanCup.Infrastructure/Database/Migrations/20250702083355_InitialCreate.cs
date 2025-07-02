using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalanCup.Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Firstname = table.Column<string>(type: "text", nullable: false),
                    Lastname = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.PlayerId);
                });

            migrationBuilder.CreateTable(
                name: "Matchs",
                columns: table => new
                {
                    MatchId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartDate = table.Column<long>(type: "bigint", nullable: false),
                    EndDate = table.Column<long>(type: "bigint", nullable: false),
                    HomePlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    AwayPlayerId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matchs", x => x.MatchId);
                    table.ForeignKey(
                        name: "FK_Matchs_Players_AwayPlayerId",
                        column: x => x.AwayPlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matchs_Players_HomePlayerId",
                        column: x => x.HomePlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matchs_AwayPlayerId",
                table: "Matchs",
                column: "AwayPlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Matchs_HomePlayerId",
                table: "Matchs",
                column: "HomePlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matchs");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
