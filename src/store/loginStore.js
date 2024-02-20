import {defineStore} from "pinia";
import {reactive, ref} from "vue";

const loginStore = defineStore(
    "login",
    () => {
        const loginSession = reactive({
            loginType:false,
            userToken: "",
        });
        const setLogin = (loginType,userToken) => {
            loginSession.loginType = loginType;
            loginSession.userToken = userToken;
        }
        return {
            loginSession,
            setLogin,
        };
    },
    {
        persist: true,
    }
);

export default loginStore;