import { Project } from "../../classes/Project";
import { UpdateProjectAction, UPDATE_PROJECT } from "./types";

export function UpdateProject(project: Project): UpdateProjectAction {
    return {
        type: UPDATE_PROJECT,
        data: project,
    };
}
