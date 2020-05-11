import Product from "../../classes/Product";

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export interface UpdateProductAction {
    type: typeof UPDATE_PRODUCT;
    data: Product;
}

export type ProductActions = UpdateProductAction;

export interface ProductsStateType {
    projects: Array<Product>;
}
