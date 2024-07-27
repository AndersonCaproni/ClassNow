using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;
using Microsoft.VisualBasic;

namespace ClassNow.Api.Aplicacao.Aplicacao;

public class CursoAplicacao : ICursoAplicacao
{
    private readonly ICursoRepositorio _cursoRepositorio;
    private readonly IProfessorRepositorio _professorRepositorio;

    public CursoAplicacao(ICursoRepositorio cursoRepositorio, IProfessorRepositorio professorRepositorio)
    {
        _cursoRepositorio = cursoRepositorio;
        _professorRepositorio = professorRepositorio;
    }

    public async Task AtualizarAsync(Curso curso)
    {
        var cursoExistente = await _cursoRepositorio.ObterPorIDAsync(curso.CursoID);

        if(cursoExistente == null)
            throw new Exception("Curso inválido!");

        await _cursoRepositorio.AtualizarAsync(curso);
    }

    public async Task<int> CriarAsync(Curso curso)
    {
        if(curso == null)
            throw new Exception("Informações do curso inválidas!");

        var professor = await _professorRepositorio.ObterPorIDAsync(curso.ProfessorID);

        if(professor == null)
            throw new Exception("Professor Invalido, por favor tente outro!");

        return await _cursoRepositorio.SalvarAsync(curso);
    }

    public async Task DeletarAsync(int cursoID)
    {
        var curso = await _cursoRepositorio.ObterPorIDAsync(cursoID);

        if(curso == null)
            throw new Exception("Curso não encontrado!");

        if(curso.Ativo == false)
            throw new Exception("Curso já deletado!");

        curso.Deletar();

        await _cursoRepositorio.AtualizarAsync(curso);
    }

    public async Task<IEnumerable<CursoCompleto>> ListarCursosAsync(bool ativo)
    {
        var lista = await _cursoRepositorio.ListarCursosAsync(ativo);

        if(lista == null)
            throw new Exception("Cursos não encontrados!");

        if(lista.Count() == 0)
            throw new Exception("Nenhum curso registrado no nosso sistema!");

        return lista;
        
    }

    public async Task<IEnumerable<Curso>> ListarPorProfessorAsync(int professorID)
    {
        var lista = await _cursoRepositorio.ListarPorProfessorAsync(professorID);

        if(lista == null)
            throw new Exception("Cursos não encontrados!");

        if(lista.Count() == 0)
            throw new Exception("Nenhum curso registrado no nosso sistema!");

        return lista;
    }

    public async Task<Curso> ObterAsync(int cursoID)
    {
        var curso = await _cursoRepositorio.ObterPorIDAsync(cursoID);

        if (curso == null)
            throw new Exception("Curso não encontrado");

        return curso;
    }

}

