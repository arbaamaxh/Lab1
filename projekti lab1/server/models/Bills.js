module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define("Bill", {
        billID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totali: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    });

    Bill.associate = (models) => {
        Bill.belongsTo(models.Patient, {
            foreignKey: {
                name: 'patientNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Bill.belongsTo(models.Hospital, {
            foreignKey: {
                name: 'hospitalNrRegjistrimit',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Bill;
};