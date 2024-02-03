import axios from "axios";
import {env} from "@/services/env.js";

export function getUserInfo(data) {
    return axios.request({
        url: "/getUserInfo",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}