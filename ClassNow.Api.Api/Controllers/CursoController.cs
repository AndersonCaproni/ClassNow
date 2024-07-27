using ClassNow.Api.Api.Modelos.Requisicao;
using ClassNow.Api.Api.Modelos.Resposta;
using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;

namespace ClassNow.Api.Api.Controller;

[ApiController]
[Route("[controller]")]
public class CursoController : ControllerBase
{
    private readonly ICursoAplicacao _cursoAplicacao;

    public CursoController(ICursoAplicacao cursoAplicacao)
    {
        _cursoAplicacao = cursoAplicacao;
    }

    [HttpGet]
    [Route("Checando")]
    public IActionResult Checando()
    {
        return Ok("API ClassNow funcionando!");
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> Criar([FromBody] CursoCriar cursoCriar)
    {
        try
        {

            Curso curso = new Curso(cursoCriar.Categoria, cursoCriar.Descricao, cursoCriar.Valor, cursoCriar.ProfessorID);

            int cursoID = await _cursoAplicacao.CriarAsync(curso);

            return Ok(cursoID);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("atualizar/{cursoID}")]
    public async Task<IActionResult> Atualizar([FromRoute] int cursoID, [FromBody] CursoAtualizar cursoAtualizar)
    {
        try
        {
            var curso = await _cursoAplicacao.ObterAsync(cursoID);

            curso.Categoria = cursoAtualizar.Categoria;
            curso.Descricao = cursoAtualizar.Descricao;
            curso.Valor = cursoAtualizar.Valor;

            await _cursoAplicacao.AtualizarAsync(curso);

            return Ok("Curso atualizado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("deletar/{cursoID}")]
    public async Task<IActionResult> Deletar([FromRoute] int cursoID)
    {
        try
        {
            await _cursoAplicacao.DeletarAsync(cursoID);

            return Ok("Curso deletado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("obter/{cursoID}")]
    public async Task<IActionResult> Obter([FromRoute] int cursoID)
    {
        try
        {
            var curso = await _cursoAplicacao.ObterAsync(cursoID);

            var cursoDetalhado = new CursoDetalhado()
            {
                CursoID = curso.CursoID,
                Descricao = curso.Descricao,
                Categoria = curso.Categoria,
                Ativo = curso.Ativo,
                Valor = curso.Valor
            };

            return Ok(cursoDetalhado);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("listarCursos")]
    public async Task<IActionResult> ListarCursos()
    {
        try
        {
            var lista = await _cursoAplicacao.ListarCursosAsync(true);

            return Ok(lista.ToList());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("listarPorProfessor/{professorID}")]
    public async Task<IActionResult> ListarPorProfessor([FromRoute] int professorID)
    {
        try
        {
            var lista = await _cursoAplicacao.ListarPorProfessorAsync(professorID);

            var listaDetalhada = lista.Select(curso => new CursoDetalhado()
            {
                CursoID = curso.CursoID,
                Descricao = curso.Descricao,
                Categoria = curso.Categoria,
                Ativo = curso.Ativo,
                Valor = curso.Valor
            }).ToList();
            

            return Ok(listaDetalhada);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}