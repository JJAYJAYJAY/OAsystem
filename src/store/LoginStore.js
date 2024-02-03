import {defineStore} from "pinia";
import {reactive, ref} from "vue";

const loginStore = defineStore(
    "login",
    () => {
        const loginSession = reactive({
            loginType: "null",
            userId: "",
        });
        const setLogin = (loginType, userId) => {
            loginSession.loginType = loginType;
            loginSession.userId = userId;
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