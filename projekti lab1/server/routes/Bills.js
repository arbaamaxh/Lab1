const express = require('express');
const router = express.Router();
const { Bill, Patient, Hospital } = require('../models');


// create (insertimi ne tabelen bills)
router.post("/", async (req,res) => {
    try{
        const {billID,data,totali,patientNrPersonal,hospitalNrRegjistrimit} = req.body;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: patientNrPersonal
            }
        });

        if(!patient){
            return res.status(400).json({error: 'Patient not found!'});
        }

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: hospitalNrRegjistrimit
            }
        });

        if(!hospital){
            return res.status(400).json({error: 'Hospital not found!'});
        }

        const newBill = await Bill.create(req.body);
        res.json(newBill);
    }
    catch(error){
        console.error('Error creating bill:', error);
        res.status(500).json({error: 'Failed to create bill'});
    }
});

// read (me i pa edhe rows te billit po edhe emrin e pacientit edhe tspitalit)
router.get('/', async (req, res) => {
    try{
        const allBills = await Bill.findAll({
            include: [
                { model: Patient, attributes: ['nrPersonal', 'emri', 'mbiemri'] },
                { model: Hospital, attributes: ['nrRegjistrimit', 'emri'] }
            ]
        });
        res.json(allBills);
    }catch(error){
        console.error('Error fetching bills:', error);
        res.status(500).json({ error: 'Failed to fetch bills' });
    }
});


// update (manipulo me te dhena ne tabelen bills)
router.put("/:billID", async (req, res) => {
    try{
        const {data,totali} = req.body;
        const billID = req.params.billID;

        const bill = await Bill.findOne({
            where: {
                billID: billID
            }
        });

        if(!bill){
            return res.status(404).json({error: 'Fatura nuk ekziston!'});
        }

        await Bill.update(
            {data,totali},
            {where: {
                billID: billID
            }}
        );

        res.status(200).json({message: 'Bill updated successfully!'});
    }
    catch(error){
        console.error('Error updating bill:', error);
        res.status(500).json({error: 'Failed to update bill'});
    }
});


// delete (fshirja e nje fature sipas ID se saj)
router.delete("/:billID", async (req, res) => {
    try{
        const billID = req.params.billID;

        const bill = await Bill.findOne({
            where: {
                billID: billID
            }
        });

        if(!bill){
            return res.status(404).json({error: 'Fatura nuk ekziston!'});
        }

        await bill.destroy();

        res.status(200).json({message: 'Bill deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting bill:', error);
        res.status(500).json({error: 'Failed to delete bill'});
    }
});

module.exports = router;