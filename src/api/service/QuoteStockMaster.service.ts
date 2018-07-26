import { Connection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ICRUD } from '../../common/interface/baseRepository.interface';
import { StockMaster } from '../../entities/StockMaster';
import { QuoteVariableType, QuoteStockType } from '../../core/infrastructure/enum/QuoteType.enum';
import { Quote } from '../../entities/Quote';

@Injectable()
export class QuoteStockMasterService implements ICRUD<StockMaster> {
    async create(item: StockMaster): Promise<StockMaster> {
        delete item['ID'];
        return await this.stockMasterRepository.save(item);
    }

    async  update(id: number, item: StockMaster): Promise<any> {
        return await this.stockMasterRepository.update(id, item);
    }

    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<StockMaster[]> {
        return await this.stockMasterRepository.find();
    }

    async findOne(id: number): Promise<StockMaster> {
        return await this.stockMasterRepository.findOne(id);
    }

    async findOneBySymbol(symbol: string): Promise<StockMaster> {
        return await this.stockMasterRepository.findOne({
            Symbol: symbol,
        });
    }

    async findBy(options: any): Promise<StockMaster | StockMaster[]> {
        return await this.stockMasterRepository.find(options);
    }

    async findTop(top_number: number = 10, type: QuoteVariableType = QuoteVariableType.Last, order: string = 'asc', q_type: any): Promise<Quote[]> {
        // let sql = `select top ${top_number} * from [dbo].[ViewLatestQuote] order by ${type} ${order} `;
        let where_condition = '';
        if (q_type == QuoteStockType.SB) {
            where_condition = `where SB = 1`;
        } else if (q_type == QuoteStockType.GEM) {
            where_condition = `where GEM = 1`;
        } else if (q_type == QuoteStockType.ETF) {
            where_condition = `where ETF = 1`;
        } else if (q_type == QuoteStockType.SHC) {
            where_condition = `where SHC = 1`;
        } else if (q_type == QuoteStockType.SZC) {
            where_condition = `where SZC = 1`;
        } else if (q_type == QuoteStockType.AH) {
            where_condition = `where AH = 1`;
        } else {
            where_condition = `where 1 = 1`;
        }

        let sql = `select  top ${top_number} [ViewLatestQuote].* , [StockMaster].[Name] ,  
        [StockMaster].[Name_CN] , [StockMaster].IGNORE , [StockMaster].SB , [StockMaster].GEM , [StockMaster].ETF 
        from [ViewLatestQuote] left join [dbo].[StockMaster]  
        on [ViewLatestQuote].Symbol = [StockMaster].Symbol_Aastock ${where_condition} order by ${type} ${order}`;
        let result = await this.connection.query(sql);
        return result;
    }

    async findOverviewStatic(): Promise<any> {
        let sql = `select * from ViewStockOverviewStatic`;
        return await this.connection.query(sql);
    }

    async findOverviewStaticByMarketCap(): Promise<any> {
        let sql = `select * from ViewStockOverviewStaticByMarketCap`;
        return await this.connection.query(sql);
    }

    // get 創業李板股份.
    async findGEM(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('IGNORE = :IGNORE AND GEM = :GEM', { IGNORE: false, GEM: true })
            .getMany();
    }
    // get ETF
    async findETF(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('IGNORE = :IGNORE AND ETF = :ETF', { IGNORE: false, ETF: true })
            .getMany();
    }

    async findSB(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('IGNORE = :IGNORE AND SB = :SB', { IGNORE: false, SB: true })
            .getMany();
    }

    async findIGNORE(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('IGNORE = :IGNORE', { IGNORE: true })
            .getMany();
    }

    async findSHC(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('SHC = :SHC', { SHC: true })
            .getMany();
    }
    async findSZC(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('SZC = :SZC', { SZC: true })
            .getMany();
    }
    async findAH(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('AH = :AH', { AH: true })
            .getMany();
    }

    async subscribeToWatch(_Symbol: string): Promise<any> {
        return await this.connection.createQueryBuilder()
            .update(StockMaster)
            .set({
                WATCH: 1,
            })
            .where('Symbol = :symbol', { symbol: _Symbol })
            .execute();
    }

    async unsubscribeToWatch(_Symbol: string): Promise<any> {
        try {
            return await this.connection.createQueryBuilder()
                .update(StockMaster)
                .set({
                    WATCH: 0,
                })
                .where('Symbol = :symbol', { symbol: _Symbol })
                .execute();
        } catch (error) {
            throw error;
        }
    }

    async subscribeToSuspend(_Symbol: string): Promise<any> {
        try {
            return await this.connection.createQueryBuilder()
                .update(StockMaster)
                .set({ SUSPEND: true, EditDate: new Date() })
                .where('symbol = :symbol', { symbol: _Symbol })
                .execute();
        } catch (error) {
            throw error;
        }
    }

    async unsubscribeToSuspend(_Symbol: string): Promise<any> {
        try {
            return await this.connection.createQueryBuilder()
                .update(StockMaster)
                .set({ SUSPEND: false, EditDate: new Date() })
                .where('symbol = :symbol', { symbol: _Symbol })
                .execute();
        } catch (error) {
            throw error;
        }
    }

    constructor(
        @Inject('StockConnection')
        private readonly connection: Connection,
        @Inject('StockMasterRepositoryToken')
        private readonly stockMasterRepository: Repository<StockMaster>) { }

}