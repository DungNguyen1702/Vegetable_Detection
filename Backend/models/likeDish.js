'use strict'
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + `/helpers/datetime`)
module.exports = (sequelize, DataTypes) => {
    class LikeDish extends Model {
        static associate(models) {
            LikeDish.belongsTo(models.User, {foreignKey : 'user_id'})
            LikeDish.belongsTo(models.Dish, {foreignKey : 'dish_id'})
        }
    }
    LikeDish.init(
        {
            dish_id: DataTypes.INTEGER,
            user_id : DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
                get: function () {
                    if (this.getDataValue('createdAt')) {
                        return toLocaleString(this.getDataValue('createdAt'))
                    }
                    return null
                },
            },
        },
        {
            sequelize,
            modelName: 'LikeDish',
        },
    )
    return LikeDish
}
