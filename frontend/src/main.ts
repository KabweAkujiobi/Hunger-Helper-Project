import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { createPinia } from 'pinia';
import router from './routes/index';

const vuetify = createVuetify({
    components,
    directives,
});

const pinia = createPinia();

const app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia);

app.config.errorHandler = (err, _vm, _info) => {
    console.error(err);
  };
      

app.mount('#app');