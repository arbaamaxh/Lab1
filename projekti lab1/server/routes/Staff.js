const express = require('express');
const router = express.Router();
const { Staff } = require('../models');


// create (insertimi ne tabelen staff)
router.post("/", async (req,res) => {
    try{
        const {emri,mbiemri,nrPersonal,adresa,nrTel} = req.body;

        const ekziston = await Staff.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(ekziston){
            return res.status(400).json({error: 'Stafi ekziston!'});
        }

        const newStaff = await Staff.create(req.body);
        res.json(newStaff);
    }
    catch(error){
        console.error('Error creating staff:', error);
        res.status(500).json({error: 'Failed to create staff'});
    }
});


// read (me i pa rows ne tabelen staff)
router.get('/', async (req, res) => {
    const allStaff = await Staff.findAll();
    res.json(allStaff);
});


// update (manipulo me te dhena ne tabelen staff)
router.put("/:nrPersonal", async (req, res) => {
    try {
        const {emri,mbiemri,adresa,nrTel} = req.body;
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
            {emri,mbiemri,adresa,nrTel},
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