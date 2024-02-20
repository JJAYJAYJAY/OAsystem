import {defineStore} from "pinia";
import {reactive, ref} from "vue";

const useReasonListStore = defineStore(
    'reason',
    () => {
        const reason = ref([
            {
                content: '',
            }
        ])
        const setReason= (newreason) => {
           reason.value = newreason;
        }
        return {
            reason,
            setReason
        }
    },
    {
        persist: true
    }
)

export default useReasonListStore;