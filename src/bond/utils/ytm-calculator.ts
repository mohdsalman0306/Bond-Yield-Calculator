export function calculateBondPrice(faceValue: number, couponPerPeriod: number, periods: number, ratePerPeriod: number): number {
    let price = 0;

    for (let t = 0; t <= periods; t++) {
        price += couponPerPeriod / Math.pow(1 + ratePerPeriod, t);
    }

    price += faceValue / Math.pow(1 + ratePerPeriod, periods);

    return price;
}

export function calculateYTM(faceValue: number, couponPerPeriod: number, periods: number, marketPrice: number): number {
    let lowerBound = 0.0001;
    let upperBound = 1;
    let tolerance = 0.000001;
    let maxIterations = 1000;

    let ytm = 0;
    for (let i = 0; i < maxIterations; i++) {
        ytm = (lowerBound + upperBound) / 2;
        const price = calculateBondPrice(faceValue, couponPerPeriod, periods, ytm);

        if (Math.abs(price - marketPrice) < tolerance) {
            break;
        }

        if(price > marketPrice) {
            lowerBound = ytm;
        } else {
            upperBound = ytm;
        }
    }

    return ytm;
}