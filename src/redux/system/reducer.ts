import { SELECT_PROJECT, SystemActions, UPDATE_TOKEN } from "./types";

const initialState = {
    selectedProjectName: undefined,
    token: undefined,
};

export default (state = initialState, action: SystemActions) => {
    switch (action.type) {
        case SELECT_PROJECT:
            return { ...state, selectedProjectName: action.data };
        case UPDATE_TOKEN:
            return { ...state, token: action.data };
        default:
            return state;
    }
};
