import {$log} from "ts-log-debug";
import { Service } from '@tsed/common';
import {createConnection, Connection} from "typeorm";
import * as fs from 'fs';

export interface DatabaseConnections {
    [key:string]: Connection;
}

@Service()
export class DatabaseService {
    private connections: DatabaseConnections = {};

    constructor() {
        // create connection
        createConnection()
        .then(connection => {
            this.connections.default = connection;
            $log.info("Connected to database.");
        }).catch(err => {
            $log.error(err);
        });
    }

    public getConnection(name:string = 'default'): Connection {
       return this.connections[name];
    }
}