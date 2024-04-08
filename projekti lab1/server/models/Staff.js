module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define("Staff", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mbiemri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrPersonal: {
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

    return Staff;
};