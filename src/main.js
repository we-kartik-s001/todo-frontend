import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);
app.use(ToastPlugin);
app.mount('#app');

// createApp(App).mount('#app')
