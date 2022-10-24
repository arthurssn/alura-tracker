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
                        <router-link :to="{ name: 'projetos.edit', params: { id: projeto.id } }">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store';
export default defineComponent({
    name: 'ProjetosLista',
    data() {
        return {
            nome_projeto: '',
        }
    },

    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>
