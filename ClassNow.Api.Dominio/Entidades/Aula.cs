namespace ClassNow.Api.Dominio.Entidades;

public class Aula
{
    #region Propriedade

    public int AulaID { get; set;}
    public int AlunoID { get; set; }
    public Aluno Aluno { get; set; }
    public int CursoID { get; set; }
    public Curso Curso { get; set; }
    public bool Ativo { get; set; }

    #endregion 

    #region Construtor

    public Aula(int alunoID, int cursoID)
    {
        AlunoID = alunoID;
        CursoID = cursoID;
        Ativo = true;
    }
    public Aula () {}

    #endregion

    #region Método

    public void Restaurar()
    {
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }

    #endregion

}