import { SelectProjectAction, SELECT_PROJECT, ToggleLoadingProductsAction, TOGGLE_LOADING_PRODUCTS } from "./types";

export function SelectProject(projectID: string | undefined): SelectProjectAction {
    return {
        type: SELECT_PROJECT,
        data: projectID,
    };
}

export function ToggleLoadingProducts(): ToggleLoadingProductsAction {
    return {
        type: TOGGLE_LOADING_PRODUCTS,
    };
}
