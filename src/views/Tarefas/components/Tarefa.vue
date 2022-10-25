<template>
    <div class="columns is-flex is-align-items-center">
        <div class="column is-4">
            {{ tarefa.descricao || 'Tarefa sem descrição' }}
        </div>
        <div class="column is-3">
            {{ tarefa.projeto?.nome || 'Tarefa sem projeto' }}
        </div>
        <div class="column">
            <vue-cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"></vue-cronometro>
        </div>
    </div>
</template>

<script lang="ts">
import ITarefa from '@/interfaces/ITarefa';
import Cronometro from './Cronometro.vue';
import { PropType } from 'vue';
export default {
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    components: {
        'vue-cronometro': Cronometro,
    }
}
</script>
