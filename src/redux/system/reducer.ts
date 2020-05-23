import { SELECT_PROJECT, SystemActions, TOGGLE_LOADING_PRODUCTS } from "./types";

const initialState = {
    selectedProjectName: undefined,
    loadingProducts: false,
};

export default (state = initialState, action: SystemActions) => {
    switch (action.type) {
        case SELECT_PROJECT:
            return { ...state, selectedProjectName: action.data };
        case TOGGLE_LOADING_PRODUCTS:
            return { ...state, loadingProducts: !state.loadingProducts };
        default:
            return state;
    }
};
