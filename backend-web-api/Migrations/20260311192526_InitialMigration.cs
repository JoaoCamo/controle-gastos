using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_web_api.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Purpose = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersonDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Age = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TransactionDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", maxLength: 400, nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    PersonId = table.Column<int>(type: "INTEGER", nullable: false),
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionDbSet_CategoryDbSet_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CategoryDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransactionDbSet_PersonDbSet_PersonId",
                        column: x => x.PersonId,
                        principalTable: "PersonDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDbSet_CategoryId",
                table: "TransactionDbSet",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDbSet_PersonId",
                table: "TransactionDbSet",
                column: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TransactionDbSet");

            migrationBuilder.DropTable(
                name: "CategoryDbSet");

            migrationBuilder.DropTable(
                name: "PersonDbSet");
        }
    }
}
