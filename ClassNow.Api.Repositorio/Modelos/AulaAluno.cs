namespace ClassNow.Api.Repositorio.Modelos;

public class AulaAluno
{
    public int AulaID { get; set; }
    public int ProfessorID { get; set; }
    public string Nome { get; set; }
    public string Categoria { get; set; }
    public string Descricao { get; set; }
    public int CursoID { get; set; }

}