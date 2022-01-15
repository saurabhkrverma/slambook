
export const ACTIONS = {
    RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
    LOGOUT_CURRENT_USER: "LOGOUT_CURRENT_USER",
    REGISTER_NEW_USER: "REGISTER_NEW_USER",
    RECEIVE_ERRORS: "RECEIVE_ERRORS",
    DISMISS_ALERT_BOX: "DISMISS_ALERT_BOX",
    ADD_COLLECTION: "ADD_COLLECTION",
    LOAD_COLLECTIONS: "LOAD_COLLECTIONS",
    UPDATE_COLLECTION: "UPDATE_COLLECTION",
    DELETE_COLLECTION: "DELETE_COLLECTION",
    SPINNER_LOAD_COLLECTION: "SPINNER_LOAD_COLLECTION",
}


export const DEFAULT_COLLECTION = {
    "collectionId": "create_collection",
    "name": "Create New Slambook",
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
