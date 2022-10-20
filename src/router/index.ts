import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Tarefas from '../views/Tarefas.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'tarefas', component: Tarefas }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;