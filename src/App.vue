<template>
    <main class="columns is-gapless is-multiline " :class="tema">
        <div class="column is-one-quarter">
            <barra-lateral @alterarTema="alterarTema"></barra-lateral>
        </div>
        <div class="column is-three-quarter conteudo">
            <minhas-notificacoes></minhas-notificacoes>
            <router-view></router-view>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './layout/BarraLateral.vue';
import ITarefa from './interfaces/ITarefa'
import Notificacoes from '@/components/shared/Notificacoes.vue';
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
        'minhas-notificacoes': Notificacoes
    },

    methods: {
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
  