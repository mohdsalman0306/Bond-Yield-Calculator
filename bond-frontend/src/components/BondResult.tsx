import type { BondResponse } from "../types/bond.ts";

interface Props {
    data: BondResponse;
}

export default function BondResult({ data }: Props) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md h-full">
            <h2 className="text-lg font-semibold mb-4">
                Bond Metrics
            </h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Current Yield</span>
                    <span className="font-medium">{data.currentYield}%</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Annual YTM</span>
                    <span className="font-medium">{data.annualYTM}%</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Total Interest</span>
                    <span className="font-medium">{data.totalInterest}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">
                        {data.premiumOrDiscount}
                    </span>
                </div>
            </div>
        </div>
    );
}