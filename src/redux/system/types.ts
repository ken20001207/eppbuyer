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

export const TOGGLE_LOADING_PRODUCTS = "TOGGLE_LOADING_PRODUCTS";
export interface ToggleLoadingProductsAction {
    type: typeof TOGGLE_LOADING_PRODUCTS;
}

export type SystemActions = SelectProjectAction | UpdateTokenAction | ToggleLoadingProductsAction;

export interface SystemStateType {
    selectedProjectName: string | undefined;
    token: string | undefined;
    loadingProducts: boolean;
}
