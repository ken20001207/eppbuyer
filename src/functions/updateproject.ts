import { Project } from "../classes/Project";

export default function updateproject(token: string, project: Project) {
    return fetch("/updateproject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ project: project }),
    });
}
