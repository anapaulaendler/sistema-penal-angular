using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaPenal.Migrations
{
    /// <inheritdoc />
    public partial class Jesus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Materia",
                table: "Estudos",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Estudos",
                keyColumn: "Materia",
                keyValue: null,
                column: "Materia",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Materia",
                table: "Estudos",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
