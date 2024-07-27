namespace ClassNow.Api.Dominio.Entidades;

public class Curso
{
    #region Atributo

    private string _categoria;
    private string _descricao;

    #endregion

    #region Propriedade
    
    public int CursoID { get; set; }
    public int ProfessorID { get; set; }
    public Professor Professor { get; set; }
    public string Categoria 
    { 
        get { return _categoria; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("Categoria inválida.");

            _categoria = value;
        }
    }
    public string Descricao 
    {
        get { return _descricao; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("Descrição inválida.");

            _descricao = value;
        }
    }
    public decimal Valor { get; set; }
    public bool Ativo { get; set; }
    public List<Aula> Aulas { get; set; }

    #endregion

    #region Construtor

    public Curso() { }

    public Curso(string categoria, string descricao, decimal valor, int professorID)
    {
        Categoria = categoria;
        Descricao = descricao;
        Valor = valor;
        Aulas = new List<Aula>();
        ProfessorID = professorID;
        Ativo = true;
    }

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