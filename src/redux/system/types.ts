export const SELECT_PROJECT = "SELECT_PROJECT";
export interface SelectProjectAction {
    type: typeof SELECT_PROJECT;
    data: string;
}

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export interface UpdateTokenAction {
    type: typeof UPDATE_TOKEN;
    data: string;
}

export type SystemActions = SelectProjectAction | UpdateTokenAction;

export interface SystemStateType {
    selectedProjectName: string | undefined;
    token: string | undefined;
}
