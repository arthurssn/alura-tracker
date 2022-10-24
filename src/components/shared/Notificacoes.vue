<template>
    <div class="notificacoes">
        <article class=" message" :class="notificacao.tipo" v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                <p>{{ notificacao.titulo }}</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'Notificacoes',
    data() {
        return {
            tipo_notificacoes: 'is-primary'
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    },
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 20vw;
    padding: 8px;
    z-index: 100;
}
</style>