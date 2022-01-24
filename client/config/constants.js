
export const ACTIONS = {
    // users
    RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
    LOGOUT_CURRENT_USER: "LOGOUT_CURRENT_USER",
    REGISTER_NEW_USER: "REGISTER_NEW_USER",
    UPDATE_CURRENT_USER: "UPDATE_CURRENT_USER",
    //collection
    ADD_COLLECTION: "ADD_COLLECTION",
    LOAD_COLLECTIONS: "LOAD_COLLECTIONS",
    UPDATE_COLLECTION: "UPDATE_COLLECTION",
    DELETE_COLLECTION: "DELETE_COLLECTION",
    // posts
    LOAD_POSTS: "LOAD_POSTS",
    SUBMIT_POSTS: "SUBMIT_POSTS",
    //errors
    RECEIVE_ERRORS: "RECEIVE_ERRORS",
    //app
    DISMISS_ALERT_BOX: "DISMISS_ALERT_BOX",
    SPINNER_LOAD_COLLECTION: "SPINNER_LOAD_COLLECTION",
    SHOW_LOADER: "SHOW_LOADER",
    HIDE_LOADER: "HIDE_LOADER"
}


export const DEFAULT_COLLECTION = {
    "collectionId": "create_collection",
    "name": "Create New Slambook",
    "collectionName": "",
    "questionnaire": [
        {
            "question":"My name in your phone",
        },
        {
            "question":"A nick name for me",
        },
        {
            "question":"Name for my autobiography",
        },
        {
            "question":"superpower you wish to give me",
        },
        {
            "question": "A message for me",
        },

    ],
    "sampleCollection": true
}
