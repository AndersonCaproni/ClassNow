namespace ClassNow.Api.Dominio.Entidades;

public class Professor
{
    #region Atributo

    private string _nome;
    private string _email;
    private string _telefone;
    private string _senha;
    private string _cidade;
    private string _estado;

    #endregion

    #region Propriedade

    public int ProfessorID { get; set; }
    public string Nome
    {
        get { return _nome; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O nome do professor é obrigatório.");

            _nome = value;
        }
    }

    public string Email
    {
        get { return _email; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O email do professor é obrigatório.");

            else if (!value.Contains("@") && !value.Contains("."))
                throw new Exception("O email do professor é inválido.");

            _email = value;
        }
    }

    public string Telefone
    {
        get { return _telefone; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O telefone do professor é obrigatório.");

            else if ((string.Concat(value.Where(char.IsDigit)).Length) != 11)
                throw new Exception("O telefone do professor é inválido.");

            _telefone = value;
        }
    }

    public string Senha
    {
        get { return _senha; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("A senha do professor é obrigatória.");

            else if (!value.Any(char.IsLower))
                throw new Exception("A senha do professor é inválida, ela deve conter pelo menos uma letra minúscula.");

            else if (!value.Any(char.IsUpper))
                throw new Exception("A senha do professor é inválida, ela deve conter pelo menos uma letra maiúscula.");

            else if (!value.Any(char.IsDigit))
                throw new Exception("A senha do professor é inválida, ela deve conter pelo menos um número.");

            else if (value.Length < 8)
                throw new Exception("A senha do professor é inválida, ela deve conter pelo menos 8 caracteres.");

            _senha = value;
        }
    }

    public string Cidade
    {
        get { return _cidade; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("A cidade do professor é obrigatória.");

            _cidade = value;
        }
    }

    public string Estado
    {
        get { return _estado; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O estado do professor é obrigatório.");

            _estado = value;
        }
    }
    public bool Ativo { get; set; }
    public List<Curso> Cursos { get; set; }

    #endregion

    #region Construtor

    public Professor() { }

    public Professor(string nome, string email, string telefone, string senha, string estado, string cidade)
    {
        Nome = nome;
        Email = email;
        Senha = senha;
        Telefone = telefone;
        Ativo = true;
        Cursos = new List<Curso>();
        Estado = estado;
        Cidade = cidade;
    }

    #endregion

    #region Metodo

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