import {defineStore} from "pinia";
import {reactive} from "vue";

const useHeaderNameStore = defineStore(
    'headerName',
    () => {
        const headerInfo = reactive({
            username: '',
            userImg: ''
        })
        const setHeaderInfo = (name,img) => {
            headerInfo.username = name
            headerInfo.userImg = img
        }
        return {
            headerInfo,
            setHeaderInfo
        }
    },
    {
        persist: true
    }
)
export default useHeaderNameStore;