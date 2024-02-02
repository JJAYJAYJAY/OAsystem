import axios from "axios";

const request = (config) => {
    const instance = axios.create({
        timeout: 1000
    });

    return instance(config);
};

export default request;