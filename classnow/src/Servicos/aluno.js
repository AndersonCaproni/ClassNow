import { HTTPClient } from "./client";

export default{

    async Criar(nome,email,senha,telefone) {
        return await HTTPClient.post("/aluno/criar", {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
        });
    },

    async Atualizar(id,nome,telefone){
        return await HTTPClient.put(`/aluno/atualizar/${id}`, {
            nome: nome,
            telefone: telefone,
        });
    },

    async Deletar(id){
        return await HTTPClient.delete(`/aluno/deletar/${id}`);
    },

    async Obter(id){
        return await HTTPClient.get(`/aluno/obter/${id}`)
    },

    async Logar(email,senha){
        return await HTTPClient.put("/aluno/logar", {
            email: email,
            senha: senha,
        });
    },

    async AdicionarAula(alunoID, cursoID){
        return await HTTPClient.post(`/aluno/adicionaraula/${alunoID}/${cursoID}`, {
            alunoID: alunoID,
            cursoID: cursoID
        });
    },

    async CancelarAula(alunoID, cursoID){
        return await HTTPClient.delete(`/aluno/cancelaraula/${alunoID}/${cursoID}`, {
            alunoID: alunoID,
            cursoID: cursoID
        });
    },

    async ListarAulas(id){
        return await HTTPClient.get(`/aluno/listaraulas/${id}`);
    }
}