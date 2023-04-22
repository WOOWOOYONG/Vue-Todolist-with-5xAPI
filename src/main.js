import { createApp } from 'vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* import specific icons */
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

import router from './router';
import App from './App.vue';
import './assets/index.css';

/* add icons to the library */
library.add(faRectangleXmark);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
