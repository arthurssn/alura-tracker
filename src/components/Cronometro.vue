<template>
    <div>
        <section>
            <strong class="cronometro">
                {{tempoDecorrido}}
            </strong>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Cronometro',
    props: {
        tempoEmSegundos: {
            type: Number,
            required: true,
            default: 0
        }
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19);
        }
    }
})

</script>

<style scoped>
.cronometro {
    color: var(--texto-primario)
}
</style>