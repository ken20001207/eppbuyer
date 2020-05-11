import Product from "../classes/Product";

export default function updateproduct(token: string, product: Product) {
    return fetch("/updateproduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ product: product }),
    });
}
