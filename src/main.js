import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp, faSortDown, faSort, faTrash, faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSortUp)
library.add(faSortDown)
library.add(faSort)
library.add(faTrash)
library.add(faPencilAlt)
library.add(faCheck)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
