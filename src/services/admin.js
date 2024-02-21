import axios from "axios";
import {env, setToken} from "@/services/env.js";

export function getSuggestions() {
    setToken();
    return axios.request({
        url: "/get_suggestions",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function setStartEndDate(data){
    setToken();
    return axios.request({
        url: "/set_start_end_date",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function getTwoWayTable(data){
    setToken();
    return axios.request({
        url: "/get_two_way_table",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function getUnmatched(){
    setToken();
    return axios.request({
        url: "/get_unmatched",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function setMatchedData(data){
    setToken();
    return axios.request({
        url: "/set_matched_data",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}