import Cookie from "js-cookie";

export function logOutUser() {
    Cookie.set('login', false);
}