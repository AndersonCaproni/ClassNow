using ClassNow.Api.Api.Modelos.Requisicao;
using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using ClassNow.Api.Api.Modelos.Reposta;

namespace ClassNow.Api.Api.Controller;

[ApiController]
[Route("[controller]")]
public class AlunoController : ControllerBase
{
    private readonly IAlunoAplicacao _alunoAplicacao;

    public AlunoController(IAlunoAplicacao alunoAplicacao)
    {
        _alunoAplicacao = alunoAplicacao;
    }

    [HttpGet]
    [Route("Checando")]
    public IActionResult Checando()
    {
        return Ok("Deu certo!");
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> Criar([FromBody] AlunoCriar alunoCriar)
    {
        try
        {

            Aluno aluno = new Aluno(alunoCriar.Nome, alunoCriar.Email, alunoCriar.Telefone, alunoCriar.Senha);

            int alunoID = await _alunoAplicacao.CriarAsync(aluno);

            return Ok(alunoID);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("atualizar/{alunoID}")]
    public async Task<IActionResult> Atualizar([FromRoute] int alunoID, [FromBody] AlunoAtualizar alunoAtualizar)
    {
        try
        {
            var aluno = await _alunoAplicacao.ObterAsync(alunoID);

            aluno.Nome = alunoAtualizar.Nome;
            aluno.Telefone = alunoAtualizar.Telefone;

            await _alunoAplicacao.AtualizarAsync(aluno);

            return Ok("Aluno atualizado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("deletar/{alunoID}")]
    public async Task<IActionResult> Deletar([FromRoute] int alunoID)
    {
        try
        {
            await _alunoAplicacao.DeletarAsync(alunoID);

            return Ok("Aluno deletado!");

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("obter/{alunoID}")]
    public async Task<IActionResult> Obter([FromRoute] int alunoID)
    {
        try
        {
            var aluno = await _alunoAplicacao.ObterAsync(alunoID);

            var alunoDetalhado = new AlunoDetalhado()
            {
                AlunoID = aluno.AlunoID,
                Nome = aluno.Nome,
                Email = aluno.Email,
                Telefone = aluno.Telefone,
                Ativo = aluno.Ativo
            };

            return Ok(alunoDetalhado);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("logar")]
    public async Task<IActionResult> Logar([FromBody] AlunoAutenticar alunoAutenticar)
    {
        try
        {
            var alunoID = await _alunoAplicacao.LogarAsync(alunoAutenticar.Email, alunoAutenticar.Senha);

            var alunoExistente = await _alunoAplicacao.ObterAsync(alunoID);

            var alunoLogado = new AlunoLogado()
            {
                AlunoID = alunoExistente.AlunoID,
                Nome = alunoExistente.Nome,
                Email = alunoExistente.Email,
                Telefone = alunoExistente.Telefone,
            };

            return Ok(alunoLogado);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [Route("adicionarAula/{alunoID}/{cursoID}")]
    public async Task<IActionResult> AdicionarAula([FromRoute] int alunoID, [FromRoute] int cursoID)
    {
        try
        {
            await _alunoAplicacao.AdicionarAulaAsync(alunoID, cursoID);

            return Ok("Aula adicionada com sucesso!");
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
            await _alunoAplicacao.CancelarAulaAsync(alunoID, cursoID);

            return Ok("Aula cancelada com sucesso!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("ListarAulas/{alunoID}")]
    public async Task<IActionResult> ListarAulas([FromRoute] int alunoID)
    {
        try
        {
            var lista = await _alunoAplicacao.ListarAulasAsync(alunoID);
            
            return Ok(lista.ToList());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}