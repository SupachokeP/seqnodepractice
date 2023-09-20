import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { player, playerId } from './player';

export interface teamAttributes {
  tid: number;
  name: string;
  league: string;
}

export type teamPk = "tid";
export type teamId = team[teamPk];
export type teamOptionalAttributes = "tid";
export type teamCreationAttributes = Optional<teamAttributes, teamOptionalAttributes>;

export class team extends Model<teamAttributes, teamCreationAttributes> implements teamAttributes {
  tid!: number;
  name!: string;
  league!: string;

  // team hasMany player via tid
  players!: player[];
  getPlayers!: Sequelize.HasManyGetAssociationsMixin<player>;
  setPlayers!: Sequelize.HasManySetAssociationsMixin<player, playerId>;
  addPlayer!: Sequelize.HasManyAddAssociationMixin<player, playerId>;
  addPlayers!: Sequelize.HasManyAddAssociationsMixin<player, playerId>;
  createPlayer!: Sequelize.HasManyCreateAssociationMixin<player>;
  removePlayer!: Sequelize.HasManyRemoveAssociationMixin<player, playerId>;
  removePlayers!: Sequelize.HasManyRemoveAssociationsMixin<player, playerId>;
  hasPlayer!: Sequelize.HasManyHasAssociationMixin<player, playerId>;
  hasPlayers!: Sequelize.HasManyHasAssociationsMixin<player, playerId>;
  countPlayers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof team {
    return team.init({
    tid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    league: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'team',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tid" },
        ]
      },
    ]
  });
  }
}
