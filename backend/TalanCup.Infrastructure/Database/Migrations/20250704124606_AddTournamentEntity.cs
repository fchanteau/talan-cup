using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalanCup.Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddTournamentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matchs_Players_AwayPlayerId",
                table: "Matchs");

            migrationBuilder.DropForeignKey(
                name: "FK_Matchs_Players_HomePlayerId",
                table: "Matchs");

            migrationBuilder.AddColumn<Guid>(
                name: "TournamentId",
                table: "Matchs",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Tournaments",
                columns: table => new
                {
                    TournamentId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<long>(type: "bigint", nullable: false),
                    MatchDuration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tournaments", x => x.TournamentId);
                });

            migrationBuilder.CreateTable(
                name: "TournamentPlayers",
                columns: table => new
                {
                    PlayersPlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    TournamentsTournamentId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentPlayers", x => new { x.PlayersPlayerId, x.TournamentsTournamentId });
                    table.ForeignKey(
                        name: "FK_TournamentPlayers_Players_PlayersPlayerId",
                        column: x => x.PlayersPlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentPlayers_Tournaments_TournamentsTournamentId",
                        column: x => x.TournamentsTournamentId,
                        principalTable: "Tournaments",
                        principalColumn: "TournamentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matchs_TournamentId",
                table: "Matchs",
                column: "TournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentPlayers_TournamentsTournamentId",
                table: "TournamentPlayers",
                column: "TournamentsTournamentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Player_AwayPlayerId",
                table: "Matchs",
                column: "AwayPlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Player_HomePlayerId",
                table: "Matchs",
                column: "HomePlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Tournament_TournamentId",
                table: "Matchs",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "TournamentId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Match_Player_AwayPlayerId",
                table: "Matchs");

            migrationBuilder.DropForeignKey(
                name: "FK_Match_Player_HomePlayerId",
                table: "Matchs");

            migrationBuilder.DropForeignKey(
                name: "FK_Match_Tournament_TournamentId",
                table: "Matchs");

            migrationBuilder.DropTable(
                name: "TournamentPlayers");

            migrationBuilder.DropTable(
                name: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Matchs_TournamentId",
                table: "Matchs");

            migrationBuilder.DropColumn(
                name: "TournamentId",
                table: "Matchs");

            migrationBuilder.AddForeignKey(
                name: "FK_Matchs_Players_AwayPlayerId",
                table: "Matchs",
                column: "AwayPlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Matchs_Players_HomePlayerId",
                table: "Matchs",
                column: "HomePlayerId",
                principalTable: "Players",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
