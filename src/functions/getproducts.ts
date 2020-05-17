import { Product_SQL } from "../classes/Product";

/** 透過 Token 向伺服器換取該用戶的 Products 。 */
export default function getproducts(token: string, ProjectName: string) {
    return fetch("/getproducts/index.php?ProjectName=" + ProjectName, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
        },
    });
}

export interface GetProductsResponseType {
    products: Array<Product_SQL>;
}
