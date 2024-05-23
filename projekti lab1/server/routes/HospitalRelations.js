const express = require('express');
const router = express.Router();
const { Department, Doctor, Patient, Staff, Room, Appointment } = require('../models');
const { Op } = require('sequelize');

//get departments in a hospital
router.get('/:nrRegjistrimit/departments', async (req, res) => {
    try{
        const { nrRegjistrimit } = req.params;
        const departments = await Department.findAll({ where: { hospitalNrRegjistrimit: nrRegjistrimit } });
        res.json(departments);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

//get doctors by a hospital's department
router.get('/:nrRegjistrimit/departments/:departmentID/doctors', async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;
        
        // First, check if the department belongs to the hospital
        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });
        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }
        // If department exists in the hospital, fetch doctors for that department
        const doctors = await Doctor.findAll({
            where: {
                depID: departmentID
            }
        });

        res.json(doctors);
    }catch(err){
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

//get patients in a hospital
router.get('/:nrRegjistrimit/patients', async (req, res) => {
    try{
        const { nrRegjistrimit } = req.params;
        const patients = await Patient.findAll({ where: { hospitalNrRegjistrimit: nrRegjistrimit } });
        res.json(patients);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

//get staff from a hospital's department
router.get('/:nrRegjistrimit/departments/:departmentID/staffs', async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;
        
        // First, check if the department belongs to the hospital
        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });
        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }
        // If department exists in the hospital, fetch doctors for that department
        const staff = await Staff.findAll({
            where: {
                depID: departmentID
            }
        });

        res.json(staff);
    }catch(err){
        console.error('Error fetching staff member:', err);
        res.status(500).json({ error: 'Failed to fetch staff member' });
    }
});


// Get rooms in a department
router.get('/:nrRegjistrimit/departments/:departmentID/rooms', async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;

        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });

        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }

        const rooms = await Room.findAll({where: { depID: departmentID } });
        
        res.json(rooms);
    }catch(err){
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

router.get('/:nrRegjistrimit/departments/:departmentID/appointments', async (req, res) => {
    try {
        const { nrRegjistrimit, departmentID } = req.params;
        const { date } = req.query; // Assuming date is passed as a query parameter in 'YYYY-MM-DD' format

        console.log(`Fetching department for hospital: ${nrRegjistrimit}, department: ${departmentID}`);

        // Check if the department belongs to the hospital
        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });

        if (!department) {
            console.log('Department not found in the hospital');
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }

        console.log(`Fetching rooms for department: ${departmentID}`);

        // Fetch rooms for the department
        const rooms = await Room.findAll({
            where: {
                depID: departmentID
            }
        });

        const roomIDs = rooms.map(room => room.roomID);
        console.log(`Rooms found: ${roomIDs}`);

        // Fetch appointments for the rooms on the specified date
        const appointments = await Appointment.findAll({
            where: {
                dhomaID: {
                    [Op.in]: roomIDs
                },
                data: date,
            },
            include: [
                { model: Patient, attributes: ['emri'] ['mbiemri'] },
                { model: Doctor, attributes: ['emri'] ['mbiemri'] },
                { model: Room, attributes: ['numri'] }
            ]
        });

        console.log(`Appointments found: ${appointments.length}`);
        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;