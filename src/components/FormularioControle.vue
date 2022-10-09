<template>
    <div class="box">
        <div class="columns">
            <div class="column is-7" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?">
            </div>
            <div class="column">
                <meu-temporizador></meu-temporizador>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue'
export default defineComponent({
    components: {
        'meu-temporizador': Temporizador
    },
})
</script>