import axios from "axios";
import {env, setToken} from "@/services/env.js";
import useLoginStore from "@/store/loginStore.js";

export function getUserList(){
    setToken();
    return axios.request({
        url: "/get_user_list",
        method: "get",
        baseURL: env.DEV_URL
    })
}