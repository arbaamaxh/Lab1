const express = require('express');
const router = express.Router();
const { Doctor } = require('../models');


// create (insertimi ne tabelen doctors)
router.post("/", async (req,res) => {
    try{
        const {emri,mbiemri,nrPersonal,adresa,nrTel} = req.body;

        const ekziston = await Doctor.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(ekziston){
            return res.status(400).json({error: 'Doktori ekziston!'});
        }

        const newDoctor = await Doctor.create(req.body);
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
    try {
        const {emri,mbiemri,adresa,nrTel} = req.body;
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
            {emri,mbiemri,adresa,nrTel},
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