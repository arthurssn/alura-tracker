<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvarProjeto">
            <div class="field">
                <label class="label" for="nome">Projeto</label>
                <input id="nome" v-model="nome_projeto" class="input" placeholder="Novo projeto" type="text">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
    name: 'Projetos',
    data() {
        return {
            nome_projeto: '',
            projetos: [] as IProjeto[]
        }
    },
    methods: {
        salvarProjeto(): void {
            const projeto: IProjeto = {
                nome: this.nome_projeto,
                id: new Date().toISOString()
            }
            this.projetos.push(projeto);
            this.nome_projeto = '';
            console.log(projeto)
            console.log(this.projetos)
        }

    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>