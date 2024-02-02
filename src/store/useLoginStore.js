import {defineStore} from "pinia";
import {ref} from "vue";

const loginStore = defineStore(
    "login",
    () => {
        const loginSession  = ref({
            loginType: "null",
            userName: "未登录",
        });
        const setLogin = (loginNewSession) => {
            loginSession.value.loginType = loginNewSession.loginType;
            loginSession.value.userName = loginNewSession.userName;
        };

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