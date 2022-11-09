<template>
    <div>
        <section>
            <strong class="cronometro">
                {{ tempoDecorrido }}
            </strong>
        </section>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'Cronometro',
    props: {
        tempoEmSegundos: {
            type: Number,
            required: true,
            default: 0
        }
    },

    setup(props) {
        return {
            tempoDecorrido: computed(() => new Date(props.tempoEmSegundos * 1000).toISOString().substring(11, 19))
        }
    }

})

</script>

<style scoped>
.cronometro {
    color: var(--texto-primario)
}
</style>