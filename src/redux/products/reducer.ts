import Product from "../../classes/Product";
import { ProductActions, UPDATE_PRODUCT } from "./types";

export default (state = new Array<Product>(), action: ProductActions) => {
    switch (action.type) {
        case UPDATE_PRODUCT:
            var oldIndex = state.findIndex((p) => p.product_id === action.data.product_id);
            if (oldIndex !== -1) return [...state.slice(oldIndex, 1), action.data];
            else return [...state, action.data];
        default:
            return state;
    }
};
