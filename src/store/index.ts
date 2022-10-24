import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { TipoNotificacao } from "@/enums/TipoNotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [
            {
                id: 1,
                texto: 'Uma notificação de sucesso',
                titulo: 'Sucesso',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: 'Uma notificação de falha',
                titulo: 'falha',
                tipo: TipoNotificacao.FALHA
            },
        ]
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
        }
    },
    actions: {

    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}