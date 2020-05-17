import { Project } from "../classes/Project";

/** 透過 Token 向伺服器換取該用戶的 Projects 。 */
export default function getprojects(token: string) {
    return fetch("/getprojects/index.php", {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
    });
}

export interface GetProjectsResponseType {
    projects: Array<Project>;
}
