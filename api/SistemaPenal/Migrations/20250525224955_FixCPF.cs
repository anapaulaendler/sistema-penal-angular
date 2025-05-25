using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaPenal.Migrations
{
    /// <inheritdoc />
    public partial class FixCPF : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Prisioneiros",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "char(11)",
                oldFixedLength: true,
                oldMaxLength: 11)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Prisioneiros",
                type: "char(11)",
                fixedLength: true,
                maxLength: 11,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
