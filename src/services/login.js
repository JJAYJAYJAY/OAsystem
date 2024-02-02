import axios from "axios";
import {env} from "@/services/env.js";

export function login(data) {
    return axios.request({
        url: "/login",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}