const { Model, DataTypes } = require('sequelize');

class User extends Model{
  static init (sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      Localization: DataTypes.STRING,
      avatar: DataTypes.STRING,
      username: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Token, {
      foreignKey: 'user_id',
      as: 'tokens'
    })

    this.hasMany(models.Follower, {
      foreignKey: 'user_id',
      as: 'followers'
  })

  this.hasMany(models.Following, {
      foreignKey: 'user_id',
      as: 'followings'
  })

  this.hasMany(models.RepositoriesStar, {
      foreignKey: 'user_id',
      as: 'repositories_stars'
  })
  }
}

module.exports = User