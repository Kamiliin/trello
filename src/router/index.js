import { createRouter, createWebHistory } from 'vue-router';
import TodosView from '../components/TodosView.vue';

const routes = [
    {
        path: '/',
        name: 'Todos',
        component: TodosView,
    },
];

const router = createRouter({
    history: createWebHistory('#'),
    routes,
});

export default router;
