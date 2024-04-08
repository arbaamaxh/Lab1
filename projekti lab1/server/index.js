const express = require("express");
const app = express();

app.use(express.json());

const db = require('./models');

// routers
const patientRouter = require('./routes/patients');
app.use("/patients", patientRouter);

const doctorRouter = require('./routes/doctors');
app.use("/doctors", doctorRouter);

const hospitalRouter = require('./routes/hospitals');
app.use("/hospitals", hospitalRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});