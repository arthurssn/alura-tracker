import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/acoes/tipoAcoes";
import { DEFINIR_PROJETOS, ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "@/store/mutacoes/tipoMutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },

        [ADICIONA_PROJETO](state, nome_projeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nome_projeto
            } as IProjeto
            state.projetos.push(projeto)
        },

        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id = projeto.id)
            state.projetos[index] = projeto
        },

        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('/projetos')
                .then(response => {
                    commit(DEFINIR_PROJETOS, response.data)
                })
        },
        [CADASTRAR_PROJETO](state, nome_projeto: string) {
            return http.post('/projetos', {
                nome: nome_projeto
            } as IProjeto)
        },
        [ALTERAR_PROJETO](state, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, {
                nome: projeto.nome
            })
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}