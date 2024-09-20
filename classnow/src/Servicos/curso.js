import { HTTPClient } from "./client";

export default {

    async Criar(categoria,descricao,valor,professorID) {
        return await HTTPClient.post("/curso/criar", {
            categoria: categoria || "",
            descricao: descricao || "",
            valor: valor || "",
            professorID: professorID || ""
        });
    },

    async Atualizar(id,categoria,descricao,valor){
        return await HTTPClient.put(`/curso/atualizar/${id}`, {
            categoria: categoria,
            descricao: descricao,
            valor: valor
        });
    },

    async Deletar(id){
        return await HTTPClient.delete(`/curso/deletar/${id}`);
    },

    async Obter(id){
        return await HTTPClient.get(`/curso/obter/${id}`);
    },

    async ListarCursos(){
        return await HTTPClient.get(`/curso/listarcursos`);
    },

    async ListarPorProfessor(id){
        return await HTTPClient.get(`/curso/listarporprofessor/${id}`);
    },

}