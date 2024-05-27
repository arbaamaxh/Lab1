const express = require('express');
const router = express.Router();
const { Department, Room, Doctor, Hospital } = require('../models');

// create (insertimi ne tabelen departments)
router.post("/", async (req,res) => {
    try{
        const { emri, lokacioni, nrTel, hospitalName } = req.body;

        const hospital = await Hospital.findOne({
            where: {
                emri: hospitalName
            }
        });

        if(!hospital){
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        const newDep = await Department.create({
            emri,
            lokacioni,
            nrTel,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit
        });

        res.json(newDep);
    }catch(error){
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Failed to create department' });
    }
});

// update (manipulo me te dhena ne tabelen departments)
router.put("/:departmentID", async (req, res) => {
    try{
        const { emri, lokacioni, nrTel } = req.body;
        const departmentID = req.params.departmentID;

        await Department.update(
            { emri, lokacioni, nrTel },
            { where: { departmentID: departmentID } }
        );

        res.status(200).json({ message: 'Department updated successfully!' });
    }catch(error){
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Failed to update department' });
    }
});

//read
router.get('/:departmentID/rooms', async (req, res) => {
    try{
        const departmentID = req.params.departmentID;
        const rooms = await Room.findAll({
            where: { depID: departmentID }
        });
        res.json(rooms);
    }catch(error){
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

router.get('/:departmentID/doctors', async (req, res) => {
    try{
        const departmentID = req.params.departmentID;
        const doctors = await Doctor.findAll({
            where: { depID: departmentID }
        });
        res.json(doctors);
    }catch(error){
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});


// read (me i pa kejt deps ne tabelen departments)
router.get('/', async (req, res) => {
    const allDeps = await Department.findAll();
    res.json(allDeps);
});


// delete (fshirja e nje departamenti sipas ID te tij)
router.delete("/:departmentID", async (req, res) => {
    try{
        const departmentID = req.params.departmentID;

        const department = await Department.findOne({
            where: {
                departmentID: departmentID
            }
        });

        if(!department){
            return res.status(404).json({error: 'Departamenti nuk ekziston!'});
        }

        await department.destroy();

        res.status(200).json({message: 'Department deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting department:', error);
        res.status(500).json({error: 'Failed to delete department'});
    }
});

module.exports = router;