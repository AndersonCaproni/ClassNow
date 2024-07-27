namespace ClassNow.Api.Api.Modelos.Requisicao;

public class CursoCriar
{
    public string? Categoria { get; set; }
    public string? Descricao { get; set; }
    public decimal Valor { get; set; }
    public int ProfessorID { get; set; }
}