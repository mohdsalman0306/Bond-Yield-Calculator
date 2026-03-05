import { useState } from "react";
import { calculateBond } from "../services/bondApi.ts";
import type { BondRequest, BondResponse } from "../types/bond.ts";

interface Props {
    onResult: (data: BondResponse) => void;
}

export default function BondForm({ onResult }: Props) {
    const [formData, setFormData] = useState<BondRequest>({
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 5,
        frequency: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await calculateBond(formData);
            onResult(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Bond Details
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 md:grid-cols-2"
            >
                {/* Face Value */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                        Face Value
                    </label>
                    <input
                        type="number"
                        name="faceValue"
                        value={formData.faceValue}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Coupon Rate */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                        Coupon Rate (%)
                    </label>
                    <input
                        type="number"
                        name="couponRate"
                        value={formData.couponRate}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Market Price */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                        Market Price
                    </label>
                    <input
                        type="number"
                        name="marketPrice"
                        value={formData.marketPrice}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Years */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                        Years to Maturity
                    </label>
                    <input
                        type="number"
                        name="yearsToMaturity"
                        value={formData.yearsToMaturity}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Frequency */}
                <div className="flex flex-col md:col-span-2">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                        Payment Frequency
                    </label>
                    <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value={1}>Annual</option>
                        <option value={2}>Semi-Annual</option>
                        <option value={4}>Quarterly</option>
                    </select>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="md:col-span-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Calculating..." : "Calculate Bond Yield"}
                </button>
            </form>

            {error && (
                <p className="text-red-500 mt-4 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}