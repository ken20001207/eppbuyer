import User from "../../classes/User";
import { UpdateUserAction, UPDATE_USER } from "./types";

export function UpdateUser(user: User): UpdateUserAction {
    return {
        type: UPDATE_USER,
        data: user,
    };
}
