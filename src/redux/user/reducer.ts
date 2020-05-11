import User from "../../classes/User";
import { UPDATE_USER, UserActions } from "./types";

export default (state = new User(), action: UserActions) => {
    switch (action.type) {
        case UPDATE_USER:
            return action.data;
        default:
            return state;
    }
};
