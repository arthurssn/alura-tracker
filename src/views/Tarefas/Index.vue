<template>
    <div>
        <formulario-controle></formulario-controle>
        <div class="lista">
            <div class="field">
                <p class="control has-icons-left">
                    <input type="email" placeholder="Procurar" class="input" v-model="filtro">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <div v-if="tarefas">
                <vue-box v-for="(tarefa, index) in tarefas" :key="index">
                    <vue-tarefa :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa">
                    </vue-tarefa>
                </vue-box>
            </div>
            <vue-box v-else>
                <div>
                    Nenhuma tarefa feita hoje
                </div>
            </vue-box>
            <modal-vue :mostrar="tarefaSelecionada != null">
                <template v-slot:header>
                    <p class="modal-card-title">Editar tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
                </template>
                <template v-slot:body>
                    <div class="field">
                        <label for="descricao_tarefa" class="label">Descrição</label>
                        <input type="text" class="input" id="descricao_tarefa" v-model="tarefaSelecionada.descricao"
                                  placeholder="Descrição da tarefa">
                    </div>
                </template>
                <template v-slot:footer>
                    <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                </template>
            </modal-vue>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioControle from './components/FormularioControle.vue';
import Tarefa from './components/Tarefa.vue';
import Box from '../../components/shared/Box.vue';
import ITarefa from '../../interfaces/ITarefa'
import { useStore } from '@/store';
import { ALTERAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/acoes/tipoAcoes';
import Modal from '@/components/shared/Modal.vue';

export default defineComponent({
    name: 'App',

    data() {
        return {
            tema: '',
            tarefaSelecionada: null as ITarefa | null
        }
    },

    components: {
        "formulario-controle": FormularioControle,
        "vue-tarefa": Tarefa,
        'vue-box': Box,
        'modal-vue': Modal
    },

    methods: {
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .finally(() => this.fecharModal())
        },
        alterarTema(temaEscuro: boolean): void {
            temaEscuro ? this.tema = 'modo-escuro' : this.tema = '';
        },
        selecionarTarefa(tarefa: ITarefa): void {
            this.tarefaSelecionada = tarefa
        },
        fecharModal(): void {
            this.tarefaSelecionada = null
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        const filtro = ref("");

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        };
    },
});
</script>

<style>
.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #fff;
    --texto-primario: #000;
}

main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
}

.conteudo {
    background-color: var(--bg-primario);
}
</style>
