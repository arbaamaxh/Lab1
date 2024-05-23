const express = require('express');
const router = express.Router();
const { Appointment, Patient, Doctor, Room } = require('../models');


// shikojme a eshte i lire termini me ate ore/date
const checkRoomAvailability = async (dhomaID,data,ora) => {
    const termini = await Appointment.findOne({
        where: {
            dhomaID: dhomaID,
            data: data,
            ora: ora
        }
    });

    return !termini;
};


// create (insertimi ne tabelen appointments)
router.post("/", async (req,res) => {
    try{
        const {appointmentID,data,ora,patientNrPersonal,doctorNrPersonal,dhomaID} = req.body;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: patientNrPersonal
            }
        });

        if(!patient){
            return res.status(400).json({error: 'Patient not found!'});
        }

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal: doctorNrPersonal
            }
        });

        if(!doctor){
            return res.status(400).json({error: 'Doctor not found!'});
        }

        const room = await Room.findOne({
            where: {
                roomID: dhomaID
            }
        });

        if(!room){
            return res.status(400).json({error: 'Room not found!'});
        }

        const isRoomAvailable = await checkRoomAvailability(dhomaID,data,ora);
        
        if(!isRoomAvailable){
            return res.status(400).json({error: 'Room is not available at the specified time.'});
        }

        const newApp = await Appointment.create(req.body);
        res.json(newApp);
    }
    catch(error){
        console.error('Error creating appointment:', error);
        res.status(500).json({error: 'Failed to create appointment'});
    }
});


//read all appoitments
// router.get('/', async (req, res) => {
//     const allAppointments = await Appointment.findAll();
//     res.json(allAppointments);
// });


// read (me i pa rows ne tabelen appointments (per dashboard))
router.get('/', async (req, res) => {
    try{
      const { date } = req.query;
      
      let whereCondition = {};
      if(date){
        whereCondition = { data: date };
      }

      // Fetch appointments from the database based on the provided date
      const appointments = await Appointment.findAll({
        where: whereCondition,
        include: [
            { model: Patient, attributes: ['emri', 'mbiemri'] },
            { model: Doctor, attributes: ['emri', 'mbiemri'],
            },
            { model: Room, attributes: ['numri'], }
        ]
    });
  
      // If appointments are found, send them in the response
      res.json(appointments);
    }catch(error){
      // If an error occurs during fetching appointments, send an error response
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'An error occurred while fetching appointments' });
    }
});


// update (manipulo me te dhena ne tabelen appointments)
router.put("/:appointmentID", async (req, res) => {
    try{
        const {data,ora,dhomaID} = req.body;
        const appointmentID = req.params.appointmentID;

        const appointment = await Appointment.findOne({
            where: {
                appointmentID: appointmentID
            }
        });

        if(!appointment){
            return res.status(404).json({error: 'Termini nuk ekziston!'});
        }

        const isRoomAvailable = await checkRoomAvailability(dhomaID,data,ora);
        
        if(!isRoomAvailable){
            return res.status(400).json({error: 'Room is not available at the specified time.'});
        }

        await Appointment.update(
            {data,ora,dhomaID},
            {where: {
                appointmentID: appointmentID
            }}
        );

        res.status(200).json({message: 'Termini updated successfully!'});
    }
    catch(error){
        console.error('Error updating appointment:', error);
        res.status(500).json({error: 'Failed to update appointment'});
    }
});


// delete (fshirja e nje termini sipas ID te tij)
router.delete("/:appointmentID", async (req, res) => {
    try{
        const appointmentID = req.params.appointmentID;

        const appointment = await Appointment.findOne({
            where: {
                appointmentID: appointmentID
            }
        });

        if(!appointment){
            return res.status(404).json({error: 'Termini nuk ekziston!'});
        }

        await appointment.destroy();

        res.status(200).json({message: 'Appointment deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting appointment:', error);
        res.status(500).json({error: 'Failed to delete appointment'});
    }
});

module.exports = router;