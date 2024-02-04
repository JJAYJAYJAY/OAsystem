import axios from "axios";
import {env} from "@/services/env.js";

export function getUserInfo(data) {
    return axios.request({
        url: "/get_user_info",
        method: "get",
        data: data,
        baseURL: env.DEV_URL
    })
}