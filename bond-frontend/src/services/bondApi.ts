import type { BondRequest, BondResponse } from "../types/bond.ts";

export async function calculateBond(
    data: BondRequest
): Promise<BondResponse> {
    const response = await fetch("http://localhost:3000/bond/calculate", {
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