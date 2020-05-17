import Product from "../classes/Product";

export default function updateproduct(product: Product) {
    return fetch("/updateproduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ product: product }),
    });
}
