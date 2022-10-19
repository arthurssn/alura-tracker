<template>
  <main class="columns is-gapless is-multiline " :class="tema">
    <!-- <main class="columns is-gapless is-multiline "> -->
    <div class="column is-one-quarter">
      <barra-lateral @alterarTema="alterarTema"></barra-lateral>
    </div>
    <div class="column is-three-quarter conteudo">
      <formulario-controle @aoSalvarTarefa="salvarTarefa"></formulario-controle>
      <div class="lista">
        <div v-if="tarefas.length > 0">
          <vue-box v-for="(tarefa, index) in tarefas" :key="index">
            <vue-tarefa :tarefa="tarefa">
            </vue-tarefa>
          </vue-box>
        </div>
        <vue-box v-else>
          <div>
            Nenhuma tarefa feita hoje
          </div>
        </vue-box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioControle from './components/FormularioControle.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa'
import Box from './components/Box.vue';

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
    "formulario-controle": FormularioControle,
    "vue-tarefa": Tarefa,
    'vue-box': Box
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
.lista {
  padding: 1.25rem;
}

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
