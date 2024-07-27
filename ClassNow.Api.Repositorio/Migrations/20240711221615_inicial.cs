using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassNow.Api.Repositorio.Migrations
{
    /// <inheritdoc />
    public partial class inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aluno",
                columns: table => new
                {
                    AlunoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Telefone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aluno", x => x.AlunoID);
                });

            migrationBuilder.CreateTable(
                name: "Professor",
                columns: table => new
                {
                    ProfessorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Telefone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cidade = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Professor", x => x.ProfessorID);
                });

            migrationBuilder.CreateTable(
                name: "Curso",
                columns: table => new
                {
                    CursoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfessorID = table.Column<int>(type: "int", nullable: false),
                    Categoria = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    Valor = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curso", x => x.CursoID);
                    table.ForeignKey(
                        name: "FK_Curso_Professor_ProfessorID",
                        column: x => x.ProfessorID,
                        principalTable: "Professor",
                        principalColumn: "ProfessorID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Aula",
                columns: table => new
                {
                    AulaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AlunoID = table.Column<int>(type: "int", nullable: false),
                    CursoID = table.Column<int>(type: "int", nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aula", x => x.AulaID);
                    table.ForeignKey(
                        name: "FK_Aula_Aluno_AlunoID",
                        column: x => x.AlunoID,
                        principalTable: "Aluno",
                        principalColumn: "AlunoID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Aula_Curso_CursoID",
                        column: x => x.CursoID,
                        principalTable: "Curso",
                        principalColumn: "CursoID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aula_AlunoID",
                table: "Aula",
                column: "AlunoID");

            migrationBuilder.CreateIndex(
                name: "IX_Aula_CursoID",
                table: "Aula",
                column: "CursoID");

            migrationBuilder.CreateIndex(
                name: "IX_Curso_ProfessorID",
                table: "Curso",
                column: "ProfessorID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aula");

            migrationBuilder.DropTable(
                name: "Aluno");

            migrationBuilder.DropTable(
                name: "Curso");

            migrationBuilder.DropTable(
                name: "Professor");
        }
    }
}
