const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// routers
const patientRouter = require('./routes/patients');
app.use("/patients", patientRouter);

const doctorRouter = require('./routes/doctors');
app.use("/doctors", doctorRouter);

const hospitalRouter = require('./routes/Hospitals');
app.use("/hospitals", hospitalRouter);

const staffRouter = require('./routes/Staff');
app.use("/staff", staffRouter);

const departmentRouter = require('./routes/Departments');
app.use("/departments", departmentRouter);

const roomRouter = require('./routes/Rooms');
app.use("/rooms", roomRouter);

const appointmentRouter = require('./routes/Appointments');
app.use("/appointments", appointmentRouter);

const prescriptionRouter = require('./routes/prescriptions');
app.use("/prescriptions", prescriptionRouter);

const billRouter = require('./routes/Bills');
app.use("/bills", billRouter);

const serviceRouter = require('./routes/Services');
app.use("/services", serviceRouter);

const hospitalRelationsRouter = require('./routes/HospitalRelations');
app.use("/hospitalRelations", hospitalRelationsRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});