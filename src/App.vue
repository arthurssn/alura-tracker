<template>
    <main class="columns is-gapless is-multiline " :class="tema">
        <div class="column is-one-quarter">
            <barra-lateral @alterarTema="alterarTema"></barra-lateral>
        </div>
        <div class="column is-three-quarter conteudo">
            <router-view></router-view>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import ITarefa from './interfaces/ITarefa'

export default defineComponent({
    name: 'App',

    data() {
        return {
            tarefas: [] as ITarefa[],
            tema: ''
        }
    },

    components: {
        "barra-lateral": BarraLateral,
    },

    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.tarefas.push(tarefa)
        },

        alterarTema(temaEscuro: boolean): void {
            temaEscuro ? this.tema = 'modo-escuro' : this.tema = '';
        },
    },
});
</script>
  
<style>
main {
    --bg-primario: #fff;
    --texto-primario: #000;
}

main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
}

.conteudo {
    background-color: var(--bg-primario);
}
</style>
  