import { Module } from '@nestjs/common';
import { StockModule } from './api/stock.module';

@Module({
    // imports: [DatabaseModule, CPPModule],
    imports: [StockModule],
    controllers: [],
})

export class AppModule {

}
