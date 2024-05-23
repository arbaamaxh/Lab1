module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("Patient", {
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
        datelindja: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gjinia: {
            type: DataTypes.CHAR,
            allowNull: false,
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

    Patient.associate = (models) => {
        Patient.belongsTo(models.Hospital, {
            foreignKey: {
                name: 'hospitalNrRegjistrimit',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Patient;
};