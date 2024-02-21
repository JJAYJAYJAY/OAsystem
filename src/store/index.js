import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import {watch} from "vue";

const pinia = createPinia();

pinia.use(({ store }) => {
    // Load initial state from sessionStorage
    const savedState = sessionStorage.getItem(store.$id)
    if (savedState) {
        store.$patch(JSON.parse(savedState))
    }

    // Watch for changes in the state and save to sessionStorage
    watch(() => store.$state, (newState) => {
        sessionStorage.setItem(store.$id, JSON.stringify(newState))
    }, { deep: true })
})

// pinia.use(piniaPluginPersistedstate);

export default pinia;
