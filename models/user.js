"use strict";
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type : DataTypes.INTEGER, 
            autoIncrement : true, 
            primaryKey : true, 
            unique : true
        },
        username: {
            type: DataTypes.STRING,
            field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        password: {
            type: DataTypes.STRING,
        }
    },{
        tableName: 'medicine_users',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        instanceMethods: {
            setPassword: function(password) {
                this.password = crypto.createHash('md5').update(password).digest('hex');
                return this;
            },
            verifyPassword: function(password, done) {
                if (crypto.createHash('md5').update(password).digest('hex') === this.password) {
                    return done(null, true, this);
                }else{
                    return done(null, false, this);
                }
            }
        }
    });
// }, {
//   classMethods: {
//     associate: function(models) {
//       User.hasMany(models.Task)
//     }
//   }
// });

    return User;
};