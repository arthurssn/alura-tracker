<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
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
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
export default defineComponent({
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroAtivo: false,
        }
    },
    emits: ['aoTemporizadorFinalizado'],
    components: {
        'vue-cronometro': Cronometro
    },
    methods: {

        iniciar(): void {
            this.cronometroAtivo = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
                console.log(this.tempoEmSegundos)
            }, 1000)
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
    }
})
</script>