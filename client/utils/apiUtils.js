import axios from 'axios';

export const loginUser = (credentials) => {
    return axios.post("/auth/login",credentials);
};

export const logoutUser = (credentials) => {
    return axios.post("/auth/logout",credentials);
};

export const initialiseApp = () => {
    return axios.get("/api/initialiseApp");
}
