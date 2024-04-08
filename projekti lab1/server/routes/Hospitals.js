const express = require('express');
const router = express.Router();
const { Hospital } = require('../models');


// create (insertimi ne tabelen hospitals)
router.post("/", async (req,res) => {
    try{
        const {emri,mbiemri,nrRegjistrimit,adresa,nrTel} = req.body;

        const ekziston = await Hospital.findOne({
            where: {
                nrRegjistrimit: nrRegjistrimit
            }
        });

        if(ekziston){
            return res.status(400).json({error: 'Spitali ekziston!'});
        }

        const newHospital = await Hospital.create(req.body);
        res.json(newHospital);
    }
    catch(error){
        console.error('Error creating hospital:', error);
        res.status(500).json({error: 'Failed to create hospital'});
    }
});


// read (me i pa rows ne tabelen hospitals)
router.get('/', async (req, res) => {
    const allHospitals = await Hospital.findAll();
    res.json(allHospitals);
});


// update (manipulo me te dhena ne tabelen hospitals)
router.put("/:nrRegjistrimit", async (req, res) => {
    try {
        const {emri,mbiemri,adresa,nrTel} = req.body;
        const nrRegjistrimit = req.params.nrRegjistrimit;

        const hospitals = await Hospital.findOne({
            where: {
                nrRegjistrimit: nrRegjistrimit
            }
        });

        if(!hospitals){
            return res.status(404).json({error: 'Spitali nuk ekziston!'});
        }

        await Hospital.update(
            {emri,mbiemri,adresa,nrTel},
            {where: {
                nrRegjistrimit: nrRegjistrimit
            }}
        );

        res.status(200).json({message: 'Hospital updated successfully!'});
    }
    catch(error){
        console.error('Error updating hospital:', error);
        res.status(500).json({error: 'Failed to update hospital'});
    }
});


// delete (fshirja e nje spitali sipas nrRegjistrimit te tij)
router.delete("/:nrRegjistrimit", async (req, res) => {
    try{
        const nrRegjistrimit = req.params.nrRegjistrimit;

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: nrRegjistrimit
            }
        });

        if(!hospital){
            return res.status(404).json({error: 'Spitali nuk ekziston!'});
        }

        await hospital.destroy();

        res.status(200).json({message: 'Hospital deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting hospital:', error);
        res.status(500).json({error: 'Failed to delete hospital'});
    }
});

module.exports = router;