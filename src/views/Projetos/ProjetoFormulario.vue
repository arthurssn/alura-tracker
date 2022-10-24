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
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipoMutacoes';
import { RouterLink } from 'vue-router';

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
            const projeto = this.store.state.projetos.find(projeto => projeto.id === this.id);
            this.nome_projeto = projeto?.nome || '';
        }
    },
    methods: {
        salvarProjeto(): void {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nome_projeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nome_projeto)
            }
            this.nome_projeto = '';
            this.$router.push({ name: 'projetos' })
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>