import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BondModule } from './bond/bond.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BondModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
