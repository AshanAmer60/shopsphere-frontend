const backendURL = process.env.BACKEND_URL ?? "http://localhost:4000";

export default async function AddProductModel() {
    const res = await fetch(`${backendURL}/api/v1/products/metrics`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load product metrics");
    }

    const json = await res.json();
    const products = json.data?.totalProducts as number;

    return products;
}