import Home from './components/Home.vue';
import EventList from './components/EventList.vue';
import AddEvent from './components/AddEvent.vue';
import Login from './components/auth/Login.vue';


const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home },
    { path: '/list', name: 'EventList', component: EventList },
    { path: '/add', name: 'AddEvent', component: AddEvent },
];

export default routes;