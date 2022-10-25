<template>
    <div class="notificacoes">
        <article class=" message" :class="notificacao.tipo" v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                <p>{{ notificacao.titulo }}</p>
                <button class="delete" aria-label="delete" @click="excluirNotificacao(notificacao.id)"></button>
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
import { useNotificar } from '@/hooks/notificador';
export default defineComponent({
    name: 'Notificacoes',
    data() {
        return {
            tipo_notificacoes: 'is-primary'
        }
    },
    methods: {
        excluirNotificacao(id: number) {
            this.excluir_notificacao(id)
        }
    },
    setup() {
        const store = useStore()
        const { excluir_notificacao } = useNotificar
        return {
            notificacoes: computed(() => store.state.notificacoes),
            excluir_notificacao
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