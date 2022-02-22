export const APP_KEYS = {
    AUTH: {
        GOOGLE: {
            CLIENT_ID: "321752025604-gi95un4smok3ej6ompcsjbnhavtumnlj.apps.googleusercontent.com",
            CLIENT_SECRET: "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",
            CALLBACK_URL: "/auth/google/callback"
        },
        FACEBOOK: {
            CLIENT_ID: "490389222449400",
            CLIENT_SECRET: "23165b521f4135a15a1528a1a747b6a3",
            CALLBACK_URL: "/auth/facebook/callback"
        }
    }
};

export const MESSAGES = {
    // user related messages
    'USER_LOGIN_SUCCESS': 'user have been logged in successfully',
    'USER_LOGIN_FAILURE_INCORRECT_PASSWORD': 'incorrect password',
    'USER_LOGIN_FAILURE_INCORRECT_EMAIL': 'provided email doesn\'t exists',
    'USER_LOGOUT_SUCCESS': 'user logged out successfully',
    'USER_LOGOUT_FAILURE': 'user couldn\'t be logged out',
    "USER_UPDATION_SUCCESS": "user updated successfully",
    "USER_UPDATION_FAILURE": "user couldn\'t be updated",
    "USER_PASSWORD_RESET_SUCCESS": "password updated successfully",
    "USER_PASSWORD_RESET_FAILURE": "password couldn\'t be updated",
    'USER_REGISTRATION_SUCCESS': 'user have been registered successfully, please login to continue',
    'USER_REGISTRATION_FAILURE_EMAIL_EXISTS': 'user registration failed, email already exists',
    'USER_REGISTRATION_FAILURE': 'user registration failed',
    "USER_LOGIN_GOOGLE_SUCCESS": "user have been logged in successfully",
    "USER_LOGIN_GOOGLE_FAILURE": "something went wrong, please try another method",
    // collection related messages
    "COLLECTION_ADDITION_SUCCESS": "collection was added successfully",
    "COLLECTION_ADDITION_FAILURE": "collection couldn\'t be added",
    "COLLECTION_PATCH_SUCCESS": "collection updated successfully",
    "COLLECTION_PATCH_FAILURE": "collection couldn\'t be updated",
    "COLLECTION_DELETE_SUCCESS": "collected deleted successfully",
    "COLLECTION_DELETE_FAILURE": "collection couldn\'t be deleted",
    // post related messages
    "POST_FETCH_SUCCESS": "posts fetched successfully",
    "POST_FETCH_FAILURE": "post couldn\'t be fetched",
    "POST_SUBMISSION_SUCCESS": "post submitted successfully",
    "POST_SUBMISSION_FAILURE": "post couldn\'t be submitted",
    "POST_DELETION_SUCCESS": "post deleted successfully",
    "POST_DELETION_FAILURE": "collection couldn\'t be deleted",
    // notification related messages
    "NOTIFICATION_FETCH_SUCCESS": "notifications fetched successfully",
    "NOTIFICATION_FETCH_FAILURE": "notifications couldn\'t be fetched",
    "NOTIFICATION_COUNT_FETCH_SUCCESS": "notifications count fetched successfully",
    "NOTIFICATION_COUNT_FETCH_FAILURE": "notifications count couldn\'t be fetched",
    "NOTIFICATION_ADDITION_SUCCESS": "notifications added successfully",
    "NOTIFICATION_ADDITION_FAILURE": "notifications couldn\'t be added",
    "NOTIFICATION_DELETE_SUCCESS": "notification deleted successfully",
    "NOTIFICATION_DELETE_FAILURE": "notification couldn\'t be deleted"
};

export const RESPONSE_TYPES = {
    //user model
    "USER_FETCH_FAILURE": "USER_FETCH_FAILURE",
    "USER_FETCH_SUCCESS": "USER_FETCH_SUCCESS",
    "USER_LOGIN_SUCCESS": "USER_LOGIN_SUCCESS",
    "USER_LOGIN_FAILURE": "USER_LOGIN_FAILURE",
    "USER_LOGOUT_SUCCESS": "USER_LOGOUT_SUCCESS",
    "USER_LOGOUT_FAILURE": "USER_LOGOUT_FAILURE",
    "USER_UPDATION_SUCCESS": "USER_UPDATION_SUCCESS",
    "USER_UPDATION_FAILURE": "USER_UPDATION_FAILURE",
    "USER_PASSWORD_RESET_SUCCESS": "USER_PASSWORD_RESET_SUCCESS",
    "USER_PASSWORD_RESET_FAILURE": "USER_PASSWORD_RESET_FAILURE",
    "USER_REGISTRATION_SUCCESS": "USER_REGISTRATION_SUCCESS",
    "USER_REGISTRATION_FAILURE": "USER_REGISTRATION_FAILURE",
    "USER_LOGIN_GOOGLE_SUCCESS": "USER_LOGIN_GOOGLE_SUCCESS",
    "USER_LOGIN_GOOGLE_FAILURE": "USER_LOGIN_GOOGLE_FAILURE",
    //collection model
    "COLLECTION_ADDITION_SUCCESS": "COLLECTION_ADDITION_SUCCESS",
    "COLLECTION_ADDITION_FAILURE": "COLLECTION_ADDITION_FAILURE",
    "COLLECTION_FETCH_SUCCESS": "COLLECTION_FETCH_SUCCESS",
    "COLLECTION_FETCH_FAILURE": "COLLECTION_FETCH_FAILURE",
    "COLLECTION_PATCH_SUCCESS": "COLLECTION_PATCH_SUCCESS",
    "COLLECTION_PATCH_FAILURE": "COLLECTION_PATCH_FAILURE",
    "COLLECTION_DELETE_SUCCESS": "COLLECTION_DELETE_SUCCESS",
    "COLLECTION_DELETE_FAILURE": "COLLECTION_DELETE_FAILURE",
    // post model
    "POST_FETCH_SUCCESS": "POST_FETCH_SUCCESS",
    "POST_FETCH_FAILURE": "POST_FETCH_FAILURE",
    "POST_SUBMISSION_SUCCESS": "POST_SUBMISSION_SUCCESS",
    "POST_SUBMISSION_FAILURE": "POST_SUBMISSION_FAILURE",
    "POST_DELETION_SUCCESS": "POST_DELETION_SUCCESS",
    "POST_DELETION_FAILURE": "POST_DELETION_FAILURE",
    // notification model
    "NOTIFICATION_FETCH_SUCCESS": "NOTIFICATION_FETCH_SUCCESS",
    "NOTIFICATION_FETCH_FAILURE": "NOTIFICATION_FETCH_FAILURE",
    "NOTIFICATION_COUNT_FETCH_SUCCESS": "NOTIFICATION_COUNT_FETCH_SUCCESS",
    "NOTIFICATION_COUNT_FETCH_FAILURE": "NOTIFICATION_COUNT_FETCH_FAILURE",
    "NOTIFICATION_ADDITION_SUCCESS": "NOTIFICATION_ADDITION_SUCCESS",
    "NOTIFICATION_ADDITION_FAILURE": "NOTIFICATION_ADDITION_FAILURE",
    "NOTIFICATION_DELETE_SUCCESS": "NOTIFICATION_DELETE_SUCCESS",
    "NOTIFICATION_DELETE_FAILURE": "NOTIFICATION_DELETE_FAILURE"
}

