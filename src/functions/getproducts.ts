import { Product_SQL } from "../classes/Product";

/** 透過 Token 向伺服器換取該用戶的 Products 。 */
export default function getproducts(token: string, ProjectName: string) {
    return fetch("/getproducts?ProjectName=" + ProjectName, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
    });
}

export interface GetProductsResponseType {
    products: Array<Product_SQL>;
}
