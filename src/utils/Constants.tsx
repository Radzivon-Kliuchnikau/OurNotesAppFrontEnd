export const API_URL = {
    MAINPAGE_URL: "/",
    LOGIN_URL: "/api/account/login",
    REGISTER_URL: "/api/account/register",
    LOGOUT_URL: "/api/account/logout",
    USE_COOKIES: "?useCookies=true",
    USE_SESSION_COOKIES: "?useSessionCookies=true",
    CHECK_AUTH: "/api/account/checkAuth",
    USER_LIST: "/api/admin/users",
    NOTES_URL: "/api/notes",
};
export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{3,23}$/;
export const PSW_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
