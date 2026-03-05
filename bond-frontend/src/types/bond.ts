export interface BondRequest {
    faceValue: number;
    couponRate: number;
    marketPrice: number;
    yearsToMaturity: number;
    frequency: number;
}

export interface CashFlow {
    period: number;
    paymentDate: string;
    couponPayment: number;
    cumulativeInterest: number;
    remainingPrincipal: number;
}

export interface BondResponse {
    currentYield: number;
    annualYTM: number;
    totalInterest: number;
    premiumOrDiscount: string;
    cashFlowSchedule: CashFlow[];
}