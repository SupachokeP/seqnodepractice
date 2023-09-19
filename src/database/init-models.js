var DataTypes = require("sequelize").DataTypes;
var _player = require("./player");
var _team = require("./team");

function initModels(sequelize) {
  var player = _player(sequelize, DataTypes);
  var team = _team(sequelize, DataTypes);

  player.belongsTo(team, { as: "tid_team", foreignKey: "tid"});
  team.hasMany(player, { as: "players", foreignKey: "tid"});

  return {
    player,
    team,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
