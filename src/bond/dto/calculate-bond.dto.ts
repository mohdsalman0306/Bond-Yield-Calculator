import { IsNumber, IsPositive, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CalculateBondDto {

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    faceValue: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    couponRate: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    marketPrice: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    yearsToMaturity: number;

    @Type(() => Number)
    @IsNumber()
    @IsIn([1, 2, 4])
    frequency: number;
}