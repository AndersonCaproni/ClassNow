namespace ClassNow.Api.Dominio.Entidades;

public class Aluno
{
    #region Atributo

    private string _nome;
    private string _email;
    private string _telefone;
    private string _senha;

    #endregion

    #region Propriedade

    public int AlunoID { get; set; }
    public string Nome
    {
        get { return _nome; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O nome do aluno é obrigatório.");

            _nome = value;
        }
    }
    public string Email
    {
        get { return _email; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O email do aluno é obrigatório.");

            else if (!value.Contains("@") && !value.Contains("."))
                throw new Exception("O email do aluno é inválido.");

            _email = value;
        }
    }
    public string Telefone
    {
        get { return _telefone; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("O telefone do aluno é obrigatório.");

            else if ((string.Concat(value.Where(char.IsDigit)).Length) != 11)
                throw new Exception("O telefone do aluno é inválido.");

            _telefone = value;
        }
    }
    public string Senha 
    {
        get { return _senha; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("A senha do aluno é obrigatória.");
        
            else if (!value.Any(char.IsLower))
                throw new Exception("A senha do aluno é inválida, ela deve conter pelo menos uma letra minúscula.");

            else if (!value.Any(char.IsUpper))
                throw new Exception("A senha do aluno é inválida, ela deve conter pelo menos uma letra maiúscula.");

            else if (!value.Any(char.IsDigit))
                throw new Exception("A senha do aluno é inválida, ela deve conter pelo menos um número.");

            else if (value.Length < 8)
                throw new Exception("A senha do aluno é inválida, ela deve conter pelo menos 8 caracteres.");

            _senha = value;
        }
    }
    public bool Ativo { get; set; }
    public List<Aula> Aulas { get; set; }

    #endregion

    #region Construtor
    
    public Aluno() { } 

    public Aluno(string nome, string email, string telefone, string senha)
    {
        Nome = nome;
        Email = email;
        Senha = senha;
        Telefone = telefone;
        Ativo = true;
        Aulas = new List<Aula>();
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