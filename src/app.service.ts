import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { initModels } from './database/init-models';
@Injectable()
export class AppService {
  private initmodel() {
    const sequelize = new Sequelize('seqnodepractice', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',

      /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    });
    return sequelize;
  }
  public async GetdataPlayer() {
    try {
      await this.initmodel().authenticate();
      console.log('Connect db success');
    } catch (error) {
      console.log('Connect db fail', error);
    }
    let db = await initModels(this.initmodel());
    let res = await db.player.findAll({
      raw: true,
    });
    return res;
  }
}
