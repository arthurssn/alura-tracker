<template>
    <section>
        <form @submit.prevent="salvarProjeto">
            <div class="field">
                <label class="label" for="nome">Novo projeto</label>
                <input id="nome" v-model="nome_projeto" class="input" placeholder="Novo projeto" type="text">
            </div>
            <div class="field">
                <button class="button mr-2" type="submit">
                    Salvar
                </button>
                <router-link :to="{ name: 'projetos' }" class="button">
                    Voltar
                </router-link>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store';
import { RouterLink, useRouter } from 'vue-router';
import { TipoNotificacao } from '@/enums/TipoNotificacao';
import { useNotificar } from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/acoes/tipoAcoes';

export default defineComponent({
    name: 'ProjetoFormulario',
    props: {
        id: {
            type: String
        }
    },

    setup(props) {
        const router = useRouter();
        const store = useStore();
        const { notificar_usuario } = useNotificar;
        const nome_projeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nome_projeto.value = projeto?.nome || "";
        }

        const salvarProjeto = (): void => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nome_projeto.value
                }).then(() => lidaComSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETO, nome_projeto.value)
                    .then(() => lidaComSucesso())
            }
        }

        const lidaComSucesso = (): void => {
            nome_projeto.value = '';

            router.push({ name: 'projetos' })

            notificar_usuario(
                TipoNotificacao.SUCESSO,
                'Tudo certo',
                'Projeto adicionado com sucesso!'
            );
        }

        return {
            nome_projeto,
            salvarProjeto
        }
    }
})
</script>