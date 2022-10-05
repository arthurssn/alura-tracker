<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <barra-lateral></barra-lateral>
    </div>
    <div class="column is-three-quarter">
      <formulario-controle></formulario-controle>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioControle from './components/FormularioControle.vue';

export default defineComponent({
  name: 'App',
  components: {
    'barra-lateral': BarraLateral,
    'formulario-controle': FormularioControle,
  }
});
</script>

<style>
html {
  margin: 0;
}
</style>
