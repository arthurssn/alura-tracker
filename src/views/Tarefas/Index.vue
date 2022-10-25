<template>
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
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormularioControle from './components/FormularioControle.vue';
import Tarefa from './components/Tarefa.vue';
import Box from '../../components/shared/Box.vue';
import ITarefa from '../../interfaces/ITarefa'
import { useStore } from '@/store';
import { OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/acoes/tipoAcoes';

export default defineComponent({
    name: 'App',

    data() {
        return {
            tema: ''
        }
    },

    components: {
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
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            tarefas: computed(() => store.state.tarefas)
        }
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
