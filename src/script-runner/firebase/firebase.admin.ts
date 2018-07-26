import { AnalysisPatternRepo } from './../dal/stock/AnalysisPatternDetailRepo';
import { AnalysisCandleStickPatternDetailRepo } from './../dal/stock/AnalysisCandleStickPatternDetailRepo';

import * as admin from "firebase-admin";
// Initialize the app with a custom auth variable, limiting the server's access
import { createConnection, Connection, EntityManager, getConnection, ConnectionManager, getConnectionOptions } from "typeorm";
import { AnalysisIndicatorsDetailRepo } from "../dal/stock/AnalysisIndicatorsDetailRepo";
import { AnalysisRegressionRepo } from '../dal/stock/AnalysisRegressionRepo';

async function firebase_init() {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: 'mystock-99d06',
            clientEmail: 'firebase-adminsdk-2x016@mystock-99d06.iam.gserviceaccount.com',
            privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmUYnvuVZDWivT\nh8Hn+FxnRppOwhDo28pqEnFCIaxngmwxG11ZZeM5LAE66eCs0cetgoHHazCNSpxb\nnTv2MZjyIfdLzaKJv8Oh52SvxJFyH2pVGN2FEPJApiltp8+SIYOWwtk7tPxe21lB\nogEIKJ1KMTK1ve/Z+Bn3UPlXVFaTu+HC7zMnMLHsrgCXvZ0pU/xLpXg3zTcG/5rC\nDyiWczrpzb+jOhAAJKF2HIF9nq9miPmKDxEZUtKrs7XKb+9IftOx8pDqZIgmnhwy\nCCiHjg8s0fQmqPaH+dVEDsT5O+mC89vGYxwTrxs3rHWiYvMYpD1EpioLuiGDqwvr\nE5J3dVtjAgMBAAECggEAAO5peV+tep49uSA+Z3q4nO5LJ3BfcyGYYu9qJ9NNCCod\n1+D9cqQX1B5abuuNLgW3Ift6HN1RF/EqSrCLEobG0IvUnSjatGXjG598570KvYRl\nAK0WEDiuUhaZ6kiYbUXXa1+kUzp7HsMSTFKkYG0RncAvLU70TlRTfo2ERJchtn01\nCH1O069tIiggCB2C6mThmnXH5LYWgGhvcP2WjOh923rSU/fT2naNH7OayhhwDUce\nRGREBLKPcbBQlaWjsJu5YETc25hRPxkLFyN/8EopjLo2/GmS7jmgOVPwEnCIy31O\nSPo6Wi/LeCbaula1XYmbVJOUyc2vWz5MEoqSI/wycQKBgQD7L++5wyzsw7MB2IR5\n6guUcU3V4XLcBSnIZXU39v3JCBAgtoW3cBjnW0wmiyrc8r1K/4JP++n3IZZTxdOz\n+FACRVdCPAF0EWYo5SajfJdCiAZIi23XRGoBc/vNGDqH7DBLribgr0VnM5TV7+23\nIZJtPsz03g+XNE8oCEQxms2fGwKBgQDquz32BCHkeeC65F+/1i5TPIHMXhls4gRW\nTCZ1dOmYjQofnF+B0k+/qB4hRkc99RSS/+REiBSs7dl/CTle0TtkRMS5eB6klmM9\ngmiwt8mM/eYHvXemtAz6f7yaxlYqgHKiLP4WSEF2Pb3mCAOHFBPfTWuxbPerOXmI\nRLl3gnzRWQKBgQCV9N9D4i4uxwJWBsHH2p7BJwdVuXsNuRNhrJhXKeAGpQaj0PNx\nOL3VWN7UX97d+xhg7rsILxdVTzrklkS1u3dgc68NPq+LcFux7GOt1FKlCHnf00Vm\n71PtvCVGIsHGpY2LkNNq7ZgcbWHceplK7ALzrztCsFNUbIkZGB5GEunQowKBgHuP\naMRR1I1yYou+n3BaDDSgiyrK9dNM/j93Al+d1UEKLSQKqnOqA3S9yG53khTZJ6Vh\nsgUpJMkKwwyODHcO6JaVZIDE7ExzJXZBaV5swFnJZQb6AzvrV1GdX+iRMtZYmv8n\nc/DCxEK7qXSnD0RRm0xWcrQIyi6FqKXEl2SDebSxAoGBALfyaQZqk9g4GxcpRtFm\nGQK3aKwI7hAqVcYQaNA5PNxY+TC9/ds1ZCXRW610I57YuREl7JLx2gtK6S3K39oQ\nFLduIbxfhJuO9qS5I/ZpH43KkBZtLugzpIBrT7Q4pLgxSn+BUGTNAurG52kesO08\nGdT4Jq5UVyU/Wp9P5Ft0Dyls\n-----END PRIVATE KEY-----\n'
        }),
        databaseURL: 'https://mystock-99d06.firebaseio.com/'
    });
    var db = admin.firestore();
    return db;
}

async function firebase_save(db: any) {
    console.log(`starting...get data..`);
    try {
        let push_to_cloud_data_indicators: any[] = await getIndicators();
        console.log(`${push_to_cloud_data_indicators.length} records has been retrieved`);
        let push_to_cloud_data_candlesStick: any[] = await getCandlesStick();
        console.log(`${push_to_cloud_data_candlesStick.length} records has been retrieved`);
        let push_to_cloud_data_pattern: any[] = await getPattern();
        console.log(`${push_to_cloud_data_pattern.length} records has been retrieved`);
        let push_to_cloud_data_regression: any[] = await getRegression();
        console.log(`${push_to_cloud_data_regression.length} records has been retrieved`);

        // var batch = db.batch();
        push_to_cloud_data_indicators.forEach(async x => {
            let tempRef = db.collection('indicators').doc(x.Symbol);
            await tempRef.set(x);
        })

        push_to_cloud_data_candlesStick.forEach(async x => {
            let tempRef = db.collection('candlesStick').doc(x.Symbol);
            await tempRef.set(x);
        })

        push_to_cloud_data_pattern.forEach(async x => {
            let tempRef = db.collection('pattern').doc(x.Symbol);
            await tempRef.set(x);
        })

        push_to_cloud_data_regression.forEach(async x => {
            let tempRef = db.collection('regression').doc(x.Symbol);
            await tempRef.set(x);
        })
        console.log(`init admin firebase.`);
    } catch (error) {
        console.log(error);
    } finally {
        console.log('done get data from local database & push to cloud')
    }
}

async function getIndicators() {
    let connection: Connection;
    try {
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let analysisIndicatorsDetailRepo = new AnalysisIndicatorsDetailRepo(connection);
        let result = await analysisIndicatorsDetailRepo.findByLatestRecords();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (connection.isConnected) {
            connection.close();
        }
    }
}

async function getCandlesStick() {
    let connection: Connection;
    try {
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let analysisCandleStickPatternDetailRepo = new AnalysisCandleStickPatternDetailRepo(connection);
        let result = await analysisCandleStickPatternDetailRepo.findByLatestRecords();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (connection.isConnected) {
            connection.close();
        }
    }
}

async function getPattern() {
    let connection: Connection;
    try {
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let analysisPatternRepo = new AnalysisPatternRepo(connection);
        let result = await analysisPatternRepo.findByLatestRecords();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (connection.isConnected) {
            connection.close();
        }
    }
}

async function getRegression() {
    let connection: Connection;
    try {
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let analysisRegressionRepo = new AnalysisRegressionRepo(connection);
        let result = await analysisRegressionRepo.findByLatestRecords();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (connection.isConnected) {
            connection.close();
        }
    }
}

async function firebaseRunAsync() {
    let db = await firebase_init();

    await firebase_save(db);
}

firebaseRunAsync();