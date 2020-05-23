export const SELECT_PROJECT = "SELECT_PROJECT";
export interface SelectProjectAction {
    type: typeof SELECT_PROJECT;
    data: string | undefined;
}

export const TOGGLE_LOADING_PRODUCTS = "TOGGLE_LOADING_PRODUCTS";
export interface ToggleLoadingProductsAction {
    type: typeof TOGGLE_LOADING_PRODUCTS;
}

export type SystemActions = SelectProjectAction | ToggleLoadingProductsAction;

export interface SystemStateType {
    selectedProjectName: string | undefined;
    loadingProducts: boolean;
}
