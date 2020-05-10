import { UPDATE_USER, UserActions } from "./types";

const initialState = {
    user: undefined,
};

export default (state = initialState, action: UserActions) => {
    switch (action.type) {
        case UPDATE_USER:
            return action.data;
        default:
            return state;
    }
};
