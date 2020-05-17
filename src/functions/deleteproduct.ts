export default function deleteproduct(productID: string) {
    return fetch("/deleteproduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ product_id: productID }),
    });
}
