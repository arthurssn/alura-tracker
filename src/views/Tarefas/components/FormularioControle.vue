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
import { key } from '@/store';
import { CADASTRAR_TAREFA } from '@/store/acoes/tipoAcoes';
import { defineComponent, PropType, computed, ref } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue'
export default defineComponent({
    components: {
        'meu-temporizador': Temporizador
    },

    setup() {
        const store = useStore(key)
        const descricao_tarefa = ref("")
        const idProjeto = ref("")

        const finalizarTarefa = (tempoDecorrido: number, projeto: IProjeto): void => {
            store.dispatch(CADASTRAR_TAREFA, {
                descricao: descricao_tarefa.value,
                duracaoEmSegundos: tempoDecorrido,
                projeto: projeto
            } as ITarefa)
            descricao_tarefa.value = '';
        }

        return {
            projetos: computed(() => store.state.projeto.projetos),
            descricao_tarefa,
            idProjeto,
            finalizarTarefa
        }
    }
})
</script>

<style>
.formulario {
    background-color: var(--bg-primario);
}
</style>