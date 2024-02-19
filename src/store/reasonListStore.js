import {defineStore} from "pinia";
import {reactive} from "vue";

const useReasonListStore = defineStore(
    'reason',
    () => {
        const reason = reactive([
            {
                content: '',
            }
        ])
        const setReason= (newreason) => {
           reason = newreason;
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