<template>
    <section>
        <router-link :to="{ name: 'projetos.criar' }" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>
                Novo Projeto
            </span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="{ name: 'projetos.edit', params: { id: projeto.id } }" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluirProjeto(projeto.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store';
import { RouterLink } from 'vue-router';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/acoes/tipoAcoes';

export default defineComponent({
    name: 'ProjetosLista',
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)

        const excluirProjeto = (id: string) => {
            store.dispatch(REMOVER_PROJETO, id)
        }

        return {
            projetos: computed(() => store.state.projeto.projetos),
            store,
            excluirProjeto
        }
    },
})
</script>
