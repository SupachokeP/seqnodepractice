import type { Sequelize } from "sequelize";
import { player as _player } from "./player";
import type { playerAttributes, playerCreationAttributes } from "./player";
import { team as _team } from "./team";
import type { teamAttributes, teamCreationAttributes } from "./team";

export {
  _player as player,
  _team as team,
};

export type {
  playerAttributes,
  playerCreationAttributes,
  teamAttributes,
  teamCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const player = _player.initModel(sequelize);
  const team = _team.initModel(sequelize);

  player.belongsTo(team, { as: "tid_team", foreignKey: "tid"});
  team.hasMany(player, { as: "players", foreignKey: "tid"});

  return {
    player: player,
    team: team,
  };
}
