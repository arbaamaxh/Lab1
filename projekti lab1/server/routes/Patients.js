const express = require('express');
const router = express.Router();
const { Patient, Hospital, Prescription } = require('../models');


// create (insertimi ne tabelen patients)
router.post("/", async (req,res) => {
    try{
        const {emri,mbiemri,nrPersonal,datelindja,gjinia,adresa,nrTel,hospitalId} = req.body;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if(patient){
            return res.status(400).json({ error: 'This ID is already assigned to a patient.' });
        }

        // const doctor = await Doctor.findOne({
        //     where: {
        //         nrPersonal: nrPersonal
        //     }
        // });

        // const staff = await Staff.findOne({
        //     where: {
        //         nrPersonal: nrPersonal
        //     }
        // });

        // if(doctor){
        //     if(doctor.emri !== emri || doctor.mbiemri !== mbiemri){
        //         return res.status(400).json({error: 'Sorry, the provided name and surname do not match our records.'});
        //     }
        // }
        // else if(staff){
        //     if(staff.emri !== emri || staff.mbiemri !== mbiemri){
        //         return res.status(400).json({ error:'Sorry, the provided name and surname do not match our records.'});
        //     }
        // }

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: hospitalId
            }
        });

        if(!hospital){
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        const newPatient = await Patient.create({
            emri,
            mbiemri,
            nrPersonal,
            datelindja,
            gjinia,
            adresa,
            nrTel,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit
        });

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


//get prescriptions by a patient
router.get('/:nrPersonal/prescriptions', async (req, res) => {
    try{
        const { nrPersonal } = req.params;
        const prescriptions = await Prescription.findAll({
            where: { patientNrPersonal: nrPersonal },
            
        });
        res.json(prescriptions);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

// Get patient details by personal number
router.get('/:nrPersonal', async (req, res) => {
    try {
        const { nrPersonal } = req.params;
        const patient = await Patient.findOne({
            where: { nrPersonal: nrPersonal },
            attributes: ['emri', 'mbiemri'], // Fetch only the name and surname
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// update (manipulo me te dhena ne tabelen patients)
router.put("/:nrPersonal", async (req, res) => {
    try{
        const {emri,mbiemri,datelindja,gjinia,adresa,nrTel} = req.body;
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
            {emri,mbiemri,datelindja,gjinia,adresa,nrTel},
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