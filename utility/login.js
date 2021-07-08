import Cookie from "js-cookie";

const credentials = {
    email: "admin@mail.com",
    password: "admin123",
}

export function logInUser(email, password) {
    if (email === credentials.email && password === credentials.password) {
        // Load cookie
        Cookie.set('login', true);
        return true;
    }
    Cookie.set('login', false);
    return false;
}

export function isUserLoggedIn() {
    console.log(Cookie.get('login') );
    return Cookie.get('login') === 'true';
}

export default logInUser;