import { TipoNotificacao } from "@/enums/TipoNotificacao"
import { INotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR_USUARIO } from "@/store/mutacoes/tipoMutacoes"

type Notificador = {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string): void
}

export default (): Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR_USUARIO, {
            titulo,
            texto,
            tipo
        } as INotificacao)
    }
    return { notificar }
}
