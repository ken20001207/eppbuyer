import { SelectProjectAction, SELECT_PROJECT, UpdateTokenAction, UPDATE_TOKEN } from "./types";

export function SelectProject(projectID: string): SelectProjectAction {
    return {
        type: SELECT_PROJECT,
        data: projectID,
    };
}

export function UpdateToken(token: string): UpdateTokenAction {
    return {
        type: UPDATE_TOKEN,
        data: token,
    };
}
