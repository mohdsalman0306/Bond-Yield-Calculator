import { useState } from "react";
import BondForm from "./components/BondForm.tsx";
import BondResult from "./components/BondResult.tsx";
import CashFlowTable from "./components/CashFlowTable.tsx";
import type { BondResponse } from "./types/bond.ts";

function App() {
  const [result, setResult] = useState<BondResponse | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">
          Bond Yield Calculator
        </h1>

        <BondForm onResult={setResult} />

        {result && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            <div className="lg:col-span-1">
              <BondResult data={result} />
            </div>

            <div className="lg:col-span-2">
              <CashFlowTable cashFlows={result.cashFlowSchedule} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;