import { Project } from "../classes/Project";

export default function updateproject(project: Project) {
    return fetch("/updateproject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ project: project }),
    });
}
