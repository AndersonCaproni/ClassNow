namespace ClassNow.Api.Api.Modelos.Resposta;
public class CursoDetalhado
{
    public int CursoID { get; set;}
    public string? Descricao { get; set;}
    public string? Categoria { get; set;}
    public bool Ativo { get; set;}
    public decimal Valor { get; set;}

}