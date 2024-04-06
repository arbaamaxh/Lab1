const express = require('express');
const router = express.Router();
const { Patient } = require('../models');


// create (insertimi ne tabelen patients)
router.post("/", async (req,res) => {
    try{
        const {emri,mbiemri,nrPersonal,adresa,nrTel} = req.body;

        const ekziston = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(ekziston){
            return res.status(400).json({error: 'Pacienti ekziston!'});
        }

        const newPatient = await Patient.create(req.body);
        res.json(newPatient);
    }
    catch(error){
        console.error('Error creating patient:', error);
        res.status(500).json({error: 'Failed to create patient'});
    }
});


// read (me i pa rows ne tabelen patients)
router.get('/', async (req, res) => {
    const allPatients = await Patient.findAll();
    res.json(allPatients);
});


// update (manipulo me te dhena ne tabelen patients)
router.put("/:nrPersonal", async (req, res) => {
    try {
        const {emri,mbiemri,adresa,nrTel} = req.body;
        const nrPersonal = req.params.nrPersonal;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!patient){
            return res.status(404).json({error: 'Pacienti nuk ekziston!'});
        }

        await Patient.update(
            {emri,mbiemri,adresa,nrTel},
            {where: {
                nrPersonal: nrPersonal
            }}
        );

        res.status(200).json({message: 'Patient updated successfully!'});
    }
    catch(error){
        console.error('Error updating patient:', error);
        res.status(500).json({error: 'Failed to update patient'});
    }
});


// delete (fshirja e nje pacienti sipas nrPersonal te tij)
router.delete("/:nrPersonal", async (req, res) => {
    try{
        const nrPersonal = req.params.nrPersonal;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(!patient){
            return res.status(404).json({error: 'Pacienti nuk ekziston!'});
        }

        await patient.destroy();

        res.status(200).json({message: 'Patient deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting patient:', error);
        res.status(500).json({error: 'Failed to delete patient'});
    }
});

module.exports = router;