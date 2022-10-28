import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {
    EXCLUIR_NOTIFICACAO,
    NOTIFICAR_USUARIO
} from "./mutacoes/tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
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
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}