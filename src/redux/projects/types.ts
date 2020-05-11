import { Project } from "../../classes/Project";

export const UPDATE_PROJECT = "UPDATE_PROJECT";
export interface UpdateProjectAction {
    type: typeof UPDATE_PROJECT;
    data: Project;
}

export type ProjectsActions = UpdateProjectAction;

export interface ProjectsStateType {
    projects: Array<Project>;
}
