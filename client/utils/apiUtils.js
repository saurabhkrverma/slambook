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

// api-users
export const resetPassword = (userInfo) => {
    return axios.patch("/public/reset/password", userInfo);
}

export const updateUser = (userInfo) => {
    return axios.patch("/api/user", userInfo);
}

// api-collections
export const createCollection = (collection) => {
    return axios.post("/api/collection",collection);
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


// api-posts

export const getPosts = () => {
    return axios.get("/api/post");
}

export const submitPost = (post) => {
    return axios.post("/public/post", post);
}

// api-notifications
export const getNotificationsCount = () => {
    return axios.get("/api/notification/count");
}

export const getNotifications = () => {
    return axios.get("/api/notification");
}

export const clearNotification = (notification) => {
    return axios.delete("/api/notification", { data: notification });
}

export const clearAllNotifications = () => {
    return axios.delete("/api/notification/all");
}
