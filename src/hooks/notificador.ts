import { TipoNotificacao } from "@/enums/TipoNotificacao"
import { INotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { EXCLUIR_NOTIFICACAO, NOTIFICAR_USUARIO } from "@/store/mutacoes/tipoMutacoes"

const notificar_usuario = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
    store.commit(NOTIFICAR_USUARIO, {
        titulo,
        texto,
        tipo
    } as INotificacao)
}

const excluir_notificacao = (id: number): void => {
    store.commit(EXCLUIR_NOTIFICACAO, id)
}

export const useNotificar = {
    notificar_usuario,
    excluir_notificacao
}