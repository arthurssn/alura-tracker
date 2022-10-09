<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <v-cronometro :tempoEmSegundos="tempoEmSegundos"></v-cronometro>
        <button class="button" @click="iniciar()">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
        </button>
        <button class="button" @click="finalizar()">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
        </button>
        <button class="button" @click="reiniciar()">
            <span class="icon">
                <i class="fa-solid fa-rotate-right"></i>
            </span>
            <span>Restart</span>
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
            cronometro: 0
        }
    },
    components: {
        'v-cronometro': Cronometro
    },
    methods: {
        iniciar(): void {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
                console.log(this.tempoEmSegundos)
            }, 1000)
        },
        finalizar(): void {
            clearInterval(this.cronometro);
        },
        reiniciar(): void {
            this.finalizar()
            this.tempoEmSegundos = 0;
        },
    }
})
</script>