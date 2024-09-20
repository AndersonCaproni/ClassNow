import { HTTPClient } from "./client";

export default {

    async Criar(nome,email,senha,telefone,estado,cidade) {
        return await HTTPClient.post("/professor/criar", {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            estado: estado,
            cidade: cidade
        });
    },

    async Atualizar(id,nome,telefone,estado,cidade){
        return await HTTPClient.put(`/professor/atualizar/${id}`, {
            nome: nome,
            telefone: telefone,
            estado: estado,
            cidade: cidade
        });
    },

    async Deletar(id){
        return await HTTPClient.delete(`/professor/deletar/${id}`);
    },

    async Obter(id){
        return await HTTPClient.get(`/professor/obter/${id}`)
    },

    async Logar(email,senha){
        return await HTTPClient.put("/professor/logar", {
            email: email,
            senha: senha,
        });
    },

    async ObterInfo(professorID){
        return await HTTPClient.put(`/professor/obterInfo/${professorID}`, {
            professorID: professorID
        });
    },

    async CancelarAula(alunoID, cursoID){
        return await HTTPClient.delete(`/professor/cancelaraula/${alunoID}/${cursoID}`, {
            alunoID: alunoID,
            cursoID: cursoID
        });
    },

    async ListarAulas(id){
        return await HTTPClient.get(`/professor/listaraulas/${id}`);
    }
}