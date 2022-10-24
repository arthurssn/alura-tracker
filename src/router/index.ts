import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'tarefas', component: Tarefas },
    { path: '/projetos', name: 'projetos', component: Projetos },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;