import { Project } from "../../classes/Project";
import { ProjectsActions, UPDATE_PROJECT } from "./types";

export default (state = new Array<Project>(), action: ProjectsActions) => {
    switch (action.type) {
        case UPDATE_PROJECT:
            return [...state.filter((p) => p.project_name !== action.data.project_name), action.data];
        default:
            return state;
    }
};
