const BASE_URL = process.env.REACT_APP_BASE_URL

export const authendpoints = {
    LOGIN_API : BASE_URL + "/api/v1/login",
    SIGNUP_API :BASE_URL + "/api/v1/signup",
    UPDATE_API :BASE_URL + "/api/v1/updateUsersDetails",
    DELETE_API :BASE_URL + "/api/v1/deleteUser",
    GET_USER_API :BASE_URL + "/api/v1/getUsersDetails"
}