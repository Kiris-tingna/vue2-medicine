"use strict";

module.exports = function(sequelize, DataTypes) {
    var Anamnesis = sequelize.define("Anamnesis", {
        id: {
            type : DataTypes.INTEGER, 
            autoIncrement : true, 
            primaryKey : true, 
            unique : true
        },
        anumber:{
            // 病例号
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        uname: {
            type: DataTypes.STRING,
        },
        sex: {
            type: DataTypes.ENUM('男', '女'),// 0 -male 1-female
        },
        age: {
            type: DataTypes.INTEGER,
        },
        when:{
            type: DataTypes.DATE,
        },
        cc: {
            type: DataTypes.TEXT,
        },
        diagnosis: {
            type: DataTypes.TEXT,
        },
        utype: {
            type: DataTypes.ENUM('0', '1', '2', '3'),
        },
        satisfaction: {
            type: DataTypes.BOOLEAN,
        },
        recipes: {
            type: DataTypes.TEXT,
        }
    },{
        tableName: 'medicine_anamnesis',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        // classMethods: {
        //     associate: function (models) {
        //         User.hasMany(models.Task)
        //     }
        // },
        instanceMethods: {
           
        }
    });


    return Anamnesis;
};