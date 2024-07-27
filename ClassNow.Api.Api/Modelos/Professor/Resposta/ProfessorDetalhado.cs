namespace ClassNow.Api.Api.Modelos.Resposta;
public class ProfessorDetalhado
{
    public int ProfessorID { get; set;}
    public string? Nome { get; set;}
    public string? Email { get; set;}
    public string? Telefone { get; set;}
    public string? Estado { get; set;}
    public string? Cidade { get; set;}    
    public bool Ativo { get; set;}
}