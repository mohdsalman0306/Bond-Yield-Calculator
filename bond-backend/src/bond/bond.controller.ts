import { Body, Controller, Post } from '@nestjs/common';
import { BondService } from './bond.service';
import { CalculateBondDto } from './dto/calculate-bond.dto';

@Controller('bond')
export class BondController {
    constructor(private readonly bondService: BondService) { }

    @Post('calculate')
    calculateBond(@Body() dto: CalculateBondDto) {
        return this.bondService.calculateBondMatrics(dto);
    }
}
