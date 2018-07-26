import { StockMaster } from './../../entities/StockMaster';
import { Analysis_Pattern_Detail } from './../../entities/Analysis_Pattern_Detail';
import { Connection, Repository, getConnection } from 'typeorm';
import { ICRUD } from '../baseRepository';

export class StockMasterRepo implements ICRUD<StockMaster> {
    async create(item: StockMaster): Promise<StockMaster> {
        delete item['ID'];
        return await this.StockMasterRepo.save(item);
    }

    async  update(id: number, item: StockMaster): Promise<any> {
        return await this.connection.createQueryBuilder()
            .update(StockMaster)
            .set({
                Name_CN: item.Name_CN,
            })
            .where('ID = :ID', { ID: id })
            .execute();
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
        console.log(_Symbol);
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

    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<StockMaster[]> {
        return await this.StockMasterRepo.find();
    }

    async findOne(id: number): Promise<StockMaster> {
        return await this.StockMasterRepo.findOne(id);
    }

    async findOneBySymbol(symbol: string): Promise<StockMaster> {
        return await this.StockMasterRepo.findOne({
            Symbol: symbol,
        });
    }

    async findBy(options: any): Promise<StockMaster | StockMaster[]> {
        return await this.StockMasterRepo.find(options);
    }

    // get 創業李板股份.
    async findGEM(): Promise<StockMaster[]> {
        return await this.connection.getRepository(StockMaster).createQueryBuilder()
            .where('IGNORE = :IGNORE AND GEM = :GEM', { IGNORE: false, GEM: true })
            .getMany();
    }

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
    StockMasterRepo: Repository<StockMaster>;
    constructor(private readonly connection: Connection) {
        this.StockMasterRepo = connection.getRepository(StockMaster);
    }

}