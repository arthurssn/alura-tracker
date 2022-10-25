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
import { defineComponent } from 'vue'
import { useStore } from '@/store';
import { RouterLink } from 'vue-router';
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
    data() {
        return {
            nome_projeto: '',
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id);
            this.nome_projeto = projeto?.nome || '';
        }
    },
    methods: {
        salvarProjeto(): void {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nome_projeto
                }).then(() => this.lidaComSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nome_projeto)
                    .then(() => this.lidaComSucesso())
            }
        },
        lidaComSucesso() {
            this.nome_projeto = '';
            this.$router.push({ name: 'projetos' })
            this.notificar_usuario(
                TipoNotificacao.SUCESSO,
                'Tudo certo',
                'Projeto adicionado com sucesso!'
            );
        }
    },
    setup() {
        const store = useStore();
        const { notificar_usuario } = useNotificar;
        return {
            store,
            notificar_usuario
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>