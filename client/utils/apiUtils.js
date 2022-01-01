import axios from 'axios';

export const loginUser = (credentials) => {
    return axios.post("/auth/login",credentials);
};

