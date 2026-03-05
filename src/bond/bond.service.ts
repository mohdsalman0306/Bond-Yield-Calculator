import { Injectable } from '@nestjs/common';
import { CalculateBondDto } from './dto/calculate-bond.dto'
import { generateCashFlow } from './utils/cash-flow-generator';
import { calculateYTM } from './utils/ytm-calculator';
import { roundTo } from './utils/round.util';

@Injectable()
export class BondService {
    calculateBondMatrics(input: CalculateBondDto) {
        const { faceValue, couponRate, marketPrice, yearsToMaturity, frequency } = input;

        // Step 1: Normalize inputs
        const periods = yearsToMaturity * frequency;
        const annualCoupon = (faceValue * couponRate) / 100;
        const couponPerPeriod = annualCoupon / frequency;

        // Step 2: Simple calculations
        const totalInterest = couponPerPeriod * periods;
        const currentYield = (annualCoupon / marketPrice);
        const premiumOrDiscount = marketPrice > faceValue ? 'Premium' : marketPrice < faceValue ? 'Discount' : 'Par';

        // Step 3: generateCashFlow
        const cashFlowSchedule = generateCashFlow(faceValue, couponPerPeriod, periods, frequency);

        // Step 4: calculateYTM (Normal + Zero Coupon Handling)

        let annualYTM: number;

        if (annualCoupon === 0) {
            // Zero Coupon Bond case
            const ytmPerPeriod = Math.pow(faceValue / marketPrice, 1 / periods) - 1;
            annualYTM = ytmPerPeriod * frequency;
        } else {
            // Normal Coupon Bond case
            const ytmPerPeriod = calculateYTM(
                faceValue,
                couponPerPeriod,
                periods,
                marketPrice
            );
            annualYTM = ytmPerPeriod * frequency;
        }

        // Step 5: return the results
        return {
            periods,
            annualCoupon: roundTo(annualCoupon, 2),
            couponPerPeriod: roundTo(couponPerPeriod, 2),
            totalInterest: roundTo(totalInterest, 2),
            currentYield: roundTo(currentYield * 100, 4), // percentage
            annualYTM: roundTo(annualYTM * 100, 4), // percentage
            premiumOrDiscount,
            cashFlowSchedule: cashFlowSchedule.map(cf => ({
                ...cf,
                couponPayment: roundTo(cf.couponPayment, 2),
                cumulativeInterest: roundTo(cf.cumulativeInterest, 2),
                principalPayment: roundTo(cf.principalPayment, 2),
            })),
            message: 'YTM and Cash Flow will be added next',
        };

    }
}
