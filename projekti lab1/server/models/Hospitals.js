module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define("Hospital", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrRegjistrimit: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        adresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrTel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Hospital;
};