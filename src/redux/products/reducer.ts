import Product from "../../classes/Product";
import { ProductActions, UPDATE_PRODUCT } from "./types";

export default (state = new Array<Product>(), action: ProductActions) => {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return [
                ...state.filter((p) => p.product_id !== action.data.product_id),
                action.data,
            ];
        default:
            return state;
    }
};
