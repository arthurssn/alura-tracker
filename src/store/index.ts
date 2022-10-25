import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {
    ADICIONA_PROJETO,
    ADICIONA_TAREFA,
    ALTERA_PROJETO,
    DEFINIR_PROJETOS,
    DEFINIR_TAREFAS,
    EXCLUIR_NOTIFICACAO,
    EXCLUIR_PROJETO,
    NOTIFICAR_USUARIO
} from "./mutacoes/tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./acoes/tipoAcoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
    tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
        tarefas: []
    },
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

        [NOTIFICAR_USUARIO](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                store.commit(EXCLUIR_NOTIFICACAO, notificacao.id)
            }, 3000);
        },

        [EXCLUIR_NOTIFICACAO](state, id) {
            state.notificacoes = state.notificacoes.filter(notif => notif.id != id)
        },

        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },

        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        }

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

        [OBTER_TAREFAS]({ commit }) {
            return http.get('/tarefas')
                .then(response => {
                    commit(DEFINIR_TAREFAS, response.data)
                })
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa
            ).then(response => {
                commit(ADICIONA_TAREFA, response.data)
            })
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}