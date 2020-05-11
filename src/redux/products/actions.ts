import Product from "../../classes/Product";
import { UpdateProductAction, UPDATE_PRODUCT } from "./types";

export function UpdateProduct(product: Product): UpdateProductAction {
    return {
        type: UPDATE_PRODUCT,
        data: product,
    };
}
