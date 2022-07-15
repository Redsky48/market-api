
import { Service } from "@tsed/common";
import { DatabaseService } from "./DatabaseService";
import { QueryRunner, Repository, FindManyOptions } from "typeorm";
import { PriceElement } from "../entity/Prices";




@Service()
export class PricesService {
    constructor(private databaseService: DatabaseService) {

    }
    private manager(queryRunner?: QueryRunner): Repository<PriceElement> {
        if (!queryRunner) {
            return this.databaseService.getConnection().getRepository(PriceElement);
        } else {
            return queryRunner.manager.getRepository(PriceElement);
        }
    }

    public findOne(params: any, queryRunner?: QueryRunner): Promise<PriceElement> {
        return this.manager(queryRunner).findOne(params);
    }

    public findOneByID(id: number, queryRunner?: QueryRunner): Promise<PriceElement> {
        return this.manager(queryRunner).findOne(id);
    }
    public findOneBySymbol(market: string, queryRunner?: QueryRunner): Promise<PriceElement> {
        return this.manager(queryRunner).findOne({market:market});
    }

    public findAll(queryRunner?: QueryRunner): Promise<PriceElement[]> {

        return this.manager(queryRunner).find();
    }


    public save(PriceElement: PriceElement, queryRunner?: QueryRunner): Promise<PriceElement> {
        return this.manager(queryRunner).save(PriceElement);
    }

    public delete(id: number, queryRunner?: QueryRunner) {
        return this.manager(queryRunner).delete({ id: id });
    }

    public async runQuery(query) {
        let result;

        result = await this.databaseService.getConnection().query(query);

        return result;
    }

}



