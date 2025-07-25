using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaPenal.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Funcionarios",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(name: "E-mail", type: "TEXT", maxLength: 100, nullable: false),
                    Papel = table.Column<byte>(type: "INTEGER", nullable: false),
                    Senha = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CPF = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prisioneiros",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    DiaDeChegada = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DiaDeSaidaOriginal = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DiaDeSaidaAtualizado = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ContadorDeLivros = table.Column<int>(type: "INTEGER", nullable: false),
                    AnoAtual = table.Column<int>(type: "INTEGER", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CPF = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prisioneiros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DiasDeTrabalho",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PrisioneiroId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiasDeTrabalho", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiasDeTrabalho_Prisioneiros_PrisioneiroId",
                        column: x => x.PrisioneiroId,
                        principalTable: "Prisioneiros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estudos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Materia = table.Column<string>(type: "TEXT", nullable: true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PrisioneiroId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Estudos_Prisioneiros_PrisioneiroId",
                        column: x => x.PrisioneiroId,
                        principalTable: "Prisioneiros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Livros",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Isbn = table.Column<string>(type: "TEXT", fixedLength: true, maxLength: 11, nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PrisioneiroId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livros", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Livros_Prisioneiros_PrisioneiroId",
                        column: x => x.PrisioneiroId,
                        principalTable: "Prisioneiros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiasDeTrabalho_PrisioneiroId",
                table: "DiasDeTrabalho",
                column: "PrisioneiroId");

            migrationBuilder.CreateIndex(
                name: "IX_Estudos_PrisioneiroId",
                table: "Estudos",
                column: "PrisioneiroId");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_PrisioneiroId",
                table: "Livros",
                column: "PrisioneiroId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiasDeTrabalho");

            migrationBuilder.DropTable(
                name: "Estudos");

            migrationBuilder.DropTable(
                name: "Funcionarios");

            migrationBuilder.DropTable(
                name: "Livros");

            migrationBuilder.DropTable(
                name: "Prisioneiros");
        }
    }
}
