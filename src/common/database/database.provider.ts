import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'StockConnection',
        useFactory: async () => await createConnection({
            type: 'mssql',
            host: 'SHERMAN-PC\\SQLEXPRESS',
            port: 1433,
            username: 'sa ',
            password: 'master',
            database: 'TradingStock',
            entities: [
                'src/entities/*.ts',
            ],
        }),
    },
];
