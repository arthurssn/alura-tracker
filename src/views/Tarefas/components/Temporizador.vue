<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <div class="select">
            <select v-model="idProjeto">
                <option value="">Selecione o projeto</option>
                <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                    {{ projeto.nome }}
                </option>
            </select>
        </div>
        <vue-cronometro :tempoEmSegundos="tempoEmSegundos"></vue-cronometro>
        <button class="button" @click="iniciarCronometro()" :disabled="cronometroAtivo">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
        </button>
        <button class="button" @click="pausarCronometro()" :disabled="!cronometroAtivo">
            <span class="icon">
                <i class="fa-solid fa-pause"></i>
            </span>
            <span>Pause</span>
        </button>
        <button class="button" @click="finalizarCronometro()">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store'
import Cronometro from './Cronometro.vue';
import { TipoNotificacao } from '@/enums/TipoNotificacao';
import { useNotificar } from '@/hooks/notificador';
export default defineComponent({

    components: {
        'vue-cronometro': Cronometro
    },

    emits: ['aoTemporizadorFinalizado'],

    setup(props, { emit }) {

        const store = useStore(key)
        const { notificar_usuario } = useNotificar
        const projetos = computed(() => store.state.projeto.projetos);
        const idProjeto = ref("");
        const cronometroEstaAtivo = ref(false);
        const idCronometro = ref(0);
        const tempoEmSegundos = ref(0);

        const iniciarCronometro = (): void => {
            const projeto = projetos.value.find(proj => proj.id == idProjeto.value) || null
            if (!projeto) {
                notificar_usuario(
                    TipoNotificacao.ATENCAO,
                    'Ocorreu um erro!',
                    'Você precisa vincular a tarefa a algum projeto'
                );
            } else {
                cronometroEstaAtivo.value = true;
                idCronometro.value = setInterval(() => {
                    tempoEmSegundos.value += 1;
                }, 1000)
            }
        }

        const pausarCronometro = (): void => {
            cronometroEstaAtivo.value = false
            clearInterval(idCronometro.value);
        }

        const finalizarCronometro = (): void => {
            pausarCronometro();
            const projeto = projetos.value.find(proj => proj.id == idProjeto.value) || null
            emit('aoTemporizadorFinalizado',
                tempoEmSegundos,
                projeto
            )
            tempoEmSegundos.value = 0;
            idProjeto.value = '';
        }

        return {
            projetos,
            notificar_usuario,
            idProjeto,
            tempoEmSegundos,
            cronometroAtivo: cronometroEstaAtivo,
            iniciarCronometro,
            pausarCronometro,
            finalizarCronometro
        }
    }
})
</script>