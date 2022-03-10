
import Home from './components/Home.vue';
import AddLeave from './components/AddLeave.vue';
import Login from './components/auth/Login.vue';

const routes = [
    { 
        path: '/login', 
        name: 'Login', 
        component: Login, 
        beforeEnter(to, from, next) {
            if(localStorage.getItem('token') === null) {
                next()
            } else {
                next('/')
            }
        }     
    },
    { 
        path: '/', 
        name: 'Home', 
        component: Home,
        beforeEnter(to, from, next) {
            if(localStorage.getItem('token')) {
                next()
            } else {
                next('/login')
            }
        }     
    },
    { 
        path: '/add', 
        name: 'AddLeave', 
        component: AddLeave,
        beforeEnter(to, from, next) {
            if(localStorage.getItem('token')) {
                next()
            } else {
                next('/login')
            }
        }
    },
];

export default routes;