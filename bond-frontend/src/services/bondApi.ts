import type { BondRequest, BondResponse } from "../types/bond.ts";

export async function calculateBond(
    data: BondRequest
): Promise<BondResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bond/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Calculation failed");
    }

    return result;
}