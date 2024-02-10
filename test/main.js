/**
 * Copyright - 2022 - Maleesha Gimshan (https://github.com/maleeshagimshan98)
 */

import { createApp } from "vue"
import app from "./app.vue"
import VueClickAwayPlugin from "vue3-click-away"

const main = createApp(app)
main.use(VueClickAwayPlugin)
main.mount('#app')


//import main from "../src/main"