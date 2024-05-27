const express = require('express');
const router = express.Router();
const { Doctor, Department,  Hospital ,Prescription } = require('../models');


// create (insertimi ne tabelen doctors)
router.post("/", async (req,res) => {
    try{
        const { emri, mbiemri, nrPersonal, adresa, nrTel, specializimi, hospitalName, departmentName } = req.body;

        const hospital = await Hospital.findOne({
            where: {
                emri: hospitalName
            }
        });

        if(!hospital){
            return res.status(400).json({error: 'Hospital not found!'});
        }

        const department = await Department.findOne({
            where: {
                hospitalNrRegjistrimit: hospital.nrRegjistrimit,
                emri: departmentName
            }
        });

        if(!department){
            return res.status(400).json({error: 'Department not found in this hospital!'});
        }

        const existingDoctor = await Doctor.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(existingDoctor){
            return res.status(400).json({error: 'Doctor with the same ID already in database!'});
        }

        const newDoctor = await Doctor.create({
            emri,
            mbiemri,
            nrPersonal,
            adresa,
            nrTel,
            specializimi,
            depID: department.departmentID,
        });

        res.json(newDoctor);
    }
    catch(error){
        console.error('Error creating doctor:', error);
        res.status(500).json({error: 'Failed to create doctor'});
    }
});


// read (me i pa rows ne tabelen doctors)
router.get('/', async (req, res) => {
    const allDoctors = await Doctor.findAll();
    res.json(allDoctors);
});


// update (manipulo me te dhena ne tabelen doctors)
router.put("/:nrPersonal", async (req, res) => {
    try{
        const {emri,mbiemri,adresa,nrTel,specializimi,depID} = req.body;
        const nrPersonal = req.params.nrPersonal;

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!doctor){
            return res.status(404).json({error: 'Doktori nuk ekziston!'});
        }

        await Doctor.update(
            {emri,mbiemri,adresa,nrTel,specializimi,depID},
            {where: {
                nrPersonal: nrPersonal
            }}
        );

        res.status(200).json({message: 'Doctor updated successfully!'});
    }
    catch(error){
        console.error('Error updating doctor:', error);
        res.status(500).json({error: 'Failed to update doctor'});
    }
});


//get prescriptions by a doctor
router.get('/:nrPersonal/prescriptions', async (req, res) => {
    try{
        const { nrPersonal } = req.params;
        const prescriptions = await Prescription.findAll({
            where: { doctorNrPersonal: nrPersonal },
            
        });
        res.json(prescriptions);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


// delete (fshirja e nje doktori sipas nrPersonal te tij)
router.delete("/:nrPersonal", async (req, res) => {
    try{
        const nrPersonal = req.params.nrPersonal;

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!doctor){
            return res.status(404).json({error: 'Doktori nuk ekziston!'});
        }

        await doctor.destroy();

        res.status(200).json({message: 'Doctor deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting doctor:', error);
        res.status(500).json({error: 'Failed to delete doctor'});
    }
});

module.exports = router;