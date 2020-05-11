import User from "../classes/User";

/** 透過帳號密碼和伺服器換取 Token 與 User data */
export default function login(username: string, password: string) {
    return fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
}

export interface LoginResponseType {
    token: string;
    userdata: User;
}
