import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import ProjetosLista from '../views/Projetos/ProjetosLista.vue'
import ProjetoFormulario from '../views/Projetos/ProjetoFormulario.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'tarefas', component: Tarefas },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            { path: '', name: 'projetos', component: ProjetosLista },
            { path: '/criar', name: 'projetos.criar', component: ProjetoFormulario },
            { path: '/:id', name: 'projetos.edit', component: ProjetoFormulario, props: true },
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

/*
  { path: '/projetos/', name: 'projetos', component: Projetos },
    { path: '/projetos/:id', name: 'projetos.edit', component: ProjetoFormulario, props: true },
    { path: '/projetos/criar', name: 'projetos.criar', component: ProjetoFormulario },
*/