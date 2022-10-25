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
        <button class="button" @click="iniciar()" :disabled="cronometroAtivo">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
        </button>
        <button class="button" @click="pausar()" :disabled="!cronometroAtivo">
            <span class="icon">
                <i class="fa-solid fa-pause"></i>
            </span>
            <span>Pause</span>
        </button>
        <button class="button" @click="finalizar()">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { key, store } from '@/store'
import Cronometro from './Cronometro.vue';
import { TipoNotificacao } from '@/enums/TipoNotificacao';
import { INotificacao } from '@/interfaces/INotificacao';
import { NOTIFICAR_USUARIO } from '@/store/mutacoes/tipoMutacoes';
import useNotificar from '@/hooks/notificador'
export default defineComponent({
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroAtivo: false,
            idProjeto: ''
        }
    },
    emits: ['aoTemporizadorFinalizado'],
    components: {
        'vue-cronometro': Cronometro
    },
    methods: {

        iniciar(): void {
            const projeto = this.projetos.find(proj => proj.id == this.idProjeto) || null
            if (!projeto) {
                this.notificar(
                    TipoNotificacao.ATENCAO,
                    'Ocorreu um erro!',
                    'Você precisa vincular a tarefa a algum projeto'
                );
            } else {
                this.cronometroAtivo = true;
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos += 1;
                }, 1000)
            }
        },
        pausar(): void {
            this.cronometroAtivo = false
            clearInterval(this.cronometro);
        },
        finalizar(): void {
            this.pausar()
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        },
    },
    setup() {
        const store = useStore(key)
        const { notificar } = useNotificar()
        return {
            projetos: computed(() => store.state.projetos),
            notificar
        }
    }
})
</script>