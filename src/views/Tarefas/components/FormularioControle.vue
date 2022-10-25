<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
                          v-model="descricao_tarefa">
            </div>
            <div class="column">
                <meu-temporizador @aoTemporizadorFinalizado="finalizarTarefa"></meu-temporizador>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import { key, store } from '@/store';
import { CADASTRAR_TAREFA } from '@/store/acoes/tipoAcoes';
import { defineComponent, PropType, computed } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue'
export default defineComponent({
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>
        }
    },
    data() {
        return {
            descricao_tarefa: '',
            idProjeto: ''
        }
    },
    emits: ['aoSalvarTarefa'],
    components: {
        'meu-temporizador': Temporizador
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number, projeto: IProjeto) {
            store.dispatch(CADASTRAR_TAREFA, {
                descricao: this.descricao_tarefa,
                duracaoEmSegundos: tempoDecorrido,
                projeto: projeto
            } as ITarefa)
            this.descricao_tarefa = '';
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style>
.formulario {
    background-color: var(--bg-primario);
}
</style>