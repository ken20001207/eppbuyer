export default function deleteproduct(token: string, productID: string) {
    return fetch("/deleteproduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ product_id: productID }),
    });
}
