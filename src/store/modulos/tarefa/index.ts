import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/acoes/tipoAcoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/mutacoes/tipoMutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },

        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },

        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tar => tar.id = tarefa.id)
            state.tarefas[index] = tarefa
        }
    },

    actions: {
        [OBTER_TAREFAS]({ commit }, filtro) {
            const url = '/tarefas'
            const params = new URLSearchParams()
            if (filtro) {
                params.append('descricao', filtro)
            }

            return http.get(url, { params })
                .then(response => {
                    commit(DEFINIR_TAREFAS, response.data)
                })
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(response => {
                    commit(ADICIONA_TAREFA, response.data)
                })
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => {
                    commit(ALTERA_TAREFA, tarefa)
                })
        }
    }
}