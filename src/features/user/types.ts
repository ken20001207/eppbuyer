import User from "../../classes/User";

export const UPDATE_USER = "UPDATE_USER";
export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    data: User;
}

export type UserActions = UpdateUserAction;

export interface UserStateType {
    user: User | undefined;
}
