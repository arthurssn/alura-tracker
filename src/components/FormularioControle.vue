<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?">
            </div>
            <div class="column">
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
                </div>
            </div>
        </div>
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
        // reiniciar(): void {

        // },
    }
})
</script>