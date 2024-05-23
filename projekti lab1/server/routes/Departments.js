const express = require('express');
const router = express.Router();
const { Department, Hospital, Doctor } = require('../models');


// create (insertimi ne tabelen departments)
router.post("/", async (req,res) => {
    try{
        const { emri, lokacioni, nrTel, hospitalName } = req.body;

        // Find the hospital by name
        const hospital = await Hospital.findOne({
            where: {
                emri: hospitalName
            }
        });

        if(!hospital){
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        // Create the department with the found hospital's ID
        const newDep = await Department.create({
            emri,
            lokacioni,
            nrTel,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit // Assuming hospital ID is stored in 'id' field
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


// read (me i pa rows ne tabelen departments)
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