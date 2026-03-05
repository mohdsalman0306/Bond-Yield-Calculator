import type { CashFlow } from "../types/bond.ts";

interface Props {
    cashFlows: CashFlow[];
}

export default function CashFlowTable({ cashFlows }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Cash Flow Schedule</h2>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Period</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Coupon</th>
                        <th className="p-2">Cumulative</th>
                        <th className="p-2">Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {cashFlows.map((cf) => (
                        <tr key={cf.period} className="text-center border-t">
                            <td className="p-2">{cf.period}</td>
                            <td className="p-2">{cf.paymentDate}</td>
                            <td className="p-2">{cf.couponPayment}</td>
                            <td className="p-2">{cf.cumulativeInterest}</td>
                            <td className="p-2">{cf.remainingPrincipal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}