type CashFlow = {
    period: number;
    paymentDate: string;
    couponPayment: number;
    cumulativeInterest: number;
    principalPayment: number;
    remainingPrincipal: number;
}

export function generateCashFlow(faceValue: number, couponPerPeriod: number, periods: number, frequency: number, startDate: Date = new Date()): CashFlow[]{
    let cumulativeInterest = 0;
    const cashFlow: CashFlow[] = [];

    const monthsGap = 12 / frequency;

    for (let i = 1; i <= periods; i++) {
        const paymentDate = new Date(startDate);
        paymentDate.setMonth(paymentDate.getMonth() + monthsGap * i);
        
        cumulativeInterest += couponPerPeriod;
        let principalPayment = i === periods ? faceValue : 0;
        let remainingPrincipal = i < periods ? faceValue : 0;

        cashFlow.push({
            period: i,
            paymentDate: paymentDate.toISOString().split('T')[0],
            couponPayment: couponPerPeriod,
            cumulativeInterest,
            principalPayment,
            remainingPrincipal,
        });
    }

    return cashFlow;
}