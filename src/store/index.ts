import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_NOTIFICACAO, EXCLUIR_PROJETO, NOTIFICAR_USUARIO } from "./mutacoes/tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
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
        }
    },
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}