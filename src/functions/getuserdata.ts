import User from "../classes/User";

/** 透過 Token 向伺服器換取 User data */
export default function getUserData(token: string) {
    return fetch("/getuserdata", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
    });
}

export interface GetUserDataResponseType {
    userdata: User;
}
