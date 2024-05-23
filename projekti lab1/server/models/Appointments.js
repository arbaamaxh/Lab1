module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define("Appointment", {
        appointmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATEONLY, // Change to DATEONLY to store only date without time
            allowNull: false,
            validate: {
                isDate: true
            },
        },
        ora: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                is: /^([01]\d|2[0-3]):([0-5]\d)$/
            }
        },
    }, {
        timestamps: true // Adds createdAt and updatedAt fields
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Patient, {
            foreignKey: {
                name: 'patientNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Appointment.belongsTo(models.Doctor, {
            foreignKey: {
                name: 'doctorNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Appointment.belongsTo(models.Room, {
            foreignKey: {
                name: 'dhomaID',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Appointment;
};