import useLoginStore from "@/store/LoginStore.js";
import axios from "axios";

export const env={
    // DEV_URL:"http://127.0.0.1:4523/m1/4003405-0-default/api",
    DEV_URL:"http://127.0.0.1:3000/api",
    // DEV_PORT:"5173"
}

export function setToken() {
    const loginStore=useLoginStore();
    if(loginStore.loginSession.loginType){
        axios.defaults.headers.common["Authorization"] ="Bearer "+loginStore.loginSession.userToken;
    }
}