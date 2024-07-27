namespace ClassNow.Api.Repositorio.Modelos;

public class AulaProfessor
{
    public int AulaID { get; set; }
    public int CursoID { get; set; }
    public int AlunoID { get; set; }
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string Email { get; set; }
    public string Categoria { get; set; }
    public string Descricao { get; set; }
}