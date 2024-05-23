const express = require('express');
const router = express.Router();
const { Staff, Department, Room, Doctor, Patient } = require('../models');


// create (insertimi ne tabelen staff)
router.post("/", async (req,res) => {
    try {
        const { emri, mbiemri, nrPersonal, pozita, adresa, nrTel, depID, dhoma } = req.body;

        const department = await Department.findOne({
            where: {
                departmentID: depID
            }
        });

        if (!department) {
            return res.status(400).json({ error: 'Department not found!' });
        }

        const room = await Room.findOne({
            where: {
                roomID: dhoma
            }
        });

        if (!room) {
            return res.status(400).json({ error: 'Room not found!' });
        }

        const ekziston = await Staff.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (ekziston) {
            return res.status(400).json({ error: 'Stafi ekziston!' });
        }

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (doctor) {
            if (doctor.emri !== emri || doctor.mbiemri !== mbiemri) {
                return res.status(400).json({ error: 'Sorry, the provided name and surname do not match our records.' });
            }
        } else if (patient) {
            if (patient.emri !== emri || patient.mbiemri !== mbiemri) {
                return res.status(400).json({ error: 'Sorry, the provided name and surname do not match our records.' });
            }
        }

        const newStaff = await Staff.create(req.body);
        await newStaff.addRooms(room); // Assuming addRooms expects a single room
        res.json(newStaff); // Send success response only if no error occurred
    } catch (error) {
        console.error('Error creating staff:', error);
        res.status(500).json({ error: 'Failed to create staff' }); // Send error response if an error occurred
    }
});


// read (me i pa rows ne tabelen staff)
router.get('/', async (req, res) => {
    const allStaff = await Staff.findAll();
    res.json(allStaff);
});


// update (manipulo me te dhena ne tabelen staff)
router.put("/:nrPersonal", async (req, res) => {
    try{
        const {emri,mbiemri,pozita,adresa,nrTel,depID,dhoma} = req.body;
        const nrPersonal = req.params.nrPersonal;

        const staff = await Staff.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!staff){
            return res.status(404).json({error: 'Stafi nuk ekziston!'});
        }

        await Staff.update(
            {emri,mbiemri,pozita,adresa,nrTel,depID,dhoma},
            {where: {
                nrPersonal: nrPersonal
            }}
        );

        res.status(200).json({message: 'Staff updated successfully!'});
    }
    catch(error){
        console.error('Error updating staff:', error);
        res.status(500).json({error: 'Failed to update staff'});
    }
});


// delete (fshirja e nje stafi sipas nrPersonal te tij)
router.delete("/:nrPersonal", async (req, res) => {
    try{
        const nrPersonal = req.params.nrPersonal;

        const staff = await Staff.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!staff){
            return res.status(404).json({error: 'Stafi nuk ekziston!'});
        }

        await staff.destroy();

        res.status(200).json({message: 'Staff deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting staff:', error);
        res.status(500).json({error: 'Failed to delete staff'});
    }
});

module.exports = router;