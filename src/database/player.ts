import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { team, teamId } from './team';

export interface playerAttributes {
  pid: number;
  tid: number;
  name: string;
  age: number;
  position: string;
}

export type playerPk = "pid";
export type playerId = player[playerPk];
export type playerOptionalAttributes = "pid";
export type playerCreationAttributes = Optional<playerAttributes, playerOptionalAttributes>;

export class player extends Model<playerAttributes, playerCreationAttributes> implements playerAttributes {
  pid!: number;
  tid!: number;
  name!: string;
  age!: number;
  position!: string;

  // player belongsTo team via tid
  tid_team!: team;
  getTid_team!: Sequelize.BelongsToGetAssociationMixin<team>;
  setTid_team!: Sequelize.BelongsToSetAssociationMixin<team, teamId>;
  createTid_team!: Sequelize.BelongsToCreateAssociationMixin<team>;

  static initModel(sequelize: Sequelize.Sequelize): typeof player {
    return player.init({
    pid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'tid'
      }
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'player',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
      {
        name: "fkIdx_112",
        using: "BTREE",
        fields: [
          { name: "tid" },
        ]
      },
    ]
  });
  }
}
