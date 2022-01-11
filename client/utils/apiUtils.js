import axios from 'axios';


// auth urls
export const loginUser = (credentials) => {
    return axios.post("/auth/login",credentials);
};

export const logoutUser = (credentials) => {
    return axios.post("/auth/logout",credentials);
};

// api endpoints
export const initialiseApp = () => {
    return axios.get("/api/initialiseApp");
}

export const registerUser = (userInfo) => {
    return axios.post("/api/user", userInfo);
}

export const loadCollections = () => {
    return axios.get("/api/collection");
}

export const updateCollection = (collection) => {
    return axios.patch("/api/collection", collection);
}

export const deleteCollection = (collection) => {
    return axios.delete(`/api/collection/${collection.collectionId}`);
}
