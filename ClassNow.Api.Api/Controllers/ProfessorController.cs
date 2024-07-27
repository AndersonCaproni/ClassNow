using ClassNow.Api.Api.Modelos.Requisicao;
using ClassNow.Api.Api.Modelos.Resposta;
using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;

namespace ClassNow.Api.Api.Controller;

[ApiController]
[Route("[controller]")]
public class ProfessorController : ControllerBase
{
    private readonly IProfessorAplicacao _professorAplicacao;

    public ProfessorController(IProfessorAplicacao professorAplicacao)
    {
        _professorAplicacao = professorAplicacao;
    }

    [HttpGet]
    [Route("Checando")]
    public IActionResult Checando()
    {
        return Ok("API ClassNow funcionando!");
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> Criar([FromBody] ProfessorCriar professorCriar)
    {
        try
        {

            Professor professor = new Professor(professorCriar.Nome, professorCriar.Email, professorCriar.Telefone, professorCriar.Senha, professorCriar.Estado, professorCriar.Cidade);

            int professorID = await _professorAplicacao.CriarAsync(professor);

            return Ok(professorID);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("atualizar/{professorID}")]
    public async Task<IActionResult> Atualizar([FromRoute] int professorID, [FromBody] ProfessorAtualizar professorAtualizar)
    {
        try
        {
            var professor = await _professorAplicacao.ObterAsync(professorID);

            professor.Nome = professorAtualizar.Nome;
            professor.Telefone = professorAtualizar.Telefone;
            professor.Estado = professorAtualizar.Estado;
            professor.Cidade = professorAtualizar.Cidade;

            await _professorAplicacao.AtualizarAsync(professor);

            return Ok("Professor atualizado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("deletar/{professorID}")]
    public async Task<IActionResult> Deletar([FromRoute] int professorID)
    {
        try
        {
            await _professorAplicacao.DeletarAsync(professorID);

            return Ok("Professor deletado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("obter/{professorID}")]
    public async Task<IActionResult> Obter([FromRoute] int professorID)
    {
        try
        {
            var professor = await _professorAplicacao.ObterAsync(professorID);

            var professorDetalhado = new ProfessorDetalhado()
            {
                ProfessorID = professor.ProfessorID,
                Nome = professor.Nome,
                Email = professor.Email,
                Telefone = professor.Telefone,
                Estado = professor.Estado,
                Cidade = professor.Cidade,
                Ativo = professor.Ativo
            };

            return Ok(professorDetalhado);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("logar")]
    public async Task<IActionResult> Logar([FromBody] ProfessorAutenticar professorAutenticar)
    {
        try
        {
            var professorID = await _professorAplicacao.LogarAsync(professorAutenticar.Email, professorAutenticar.Senha);

            var professorExistente = await _professorAplicacao.ObterAsync(professorID);

            var professorLogado = new ProfessorLogado()
            {
                ProfessorID = professorExistente.ProfessorID,
                Nome = professorExistente.Nome,
                Email = professorExistente.Email,
                Telefone = professorExistente.Telefone,
                Estado = professorExistente.Estado,
                Cidade = professorExistente.Cidade
            };

            return Ok(professorLogado);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("cancelarAula/{alunoID}/{cursoID}")]
    public async Task<IActionResult> CancelarAula([FromRoute] int alunoID, [FromRoute] int cursoID)
    {
        try
        {
            await _professorAplicacao.CancelarAulaAsync(alunoID, cursoID);

            return Ok("Aula cancelada com sucesso!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("ListarAulas/{professorID}")]
    public async Task<IActionResult> ListarAulas([FromRoute] int professorID)
    {
        try
        {
            var lista = await _professorAplicacao.ListarAulasAsync(professorID);
            
            return Ok(lista.ToList());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}