const express = require('express');
const router = express.Router();
const { Doctor, Department,  Hospital ,Prescription } = require('../models');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        // Generate a unique filename
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });

// create (insertimi ne tabelen doctors)
router.post("/", upload.single('img'),async (req,res) => {
    try{
        const { emri,mbiemri,nrPersonal,adresa,nrTel,specializimi,email,password,hospitalName,departmentName } = req.body;
        const imageUrl = req.file ? req.file.path : '';

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

        const doctorEmail = await Doctor.findOne({
            where: { email: email }
        });
        
        if (doctorEmail && doctorEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const newDoctor = await Doctor.create({
            emri,
            mbiemri,
            nrPersonal,
            adresa,
            nrTel,
            specializimi,
            email,
            password,
            depID: department.departmentID,
            imageUrl
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
router.put("/:nrPersonal", upload.single('img'), async (req, res) => {
    try{
        const {emri,mbiemri,adresa,nrTel,specializimi,email,password,depID} = req.body;
        const nrPersonal = req.params.nrPersonal;

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal
            }
        });

        if(!doctor){
            return res.status(404).json({error: 'Doktori nuk ekziston!'});
        }

        const doctorEmail = await Doctor.findOne({
            where: { email: email }
        });

        if (doctorEmail && doctorEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const imageUrl = req.file ? req.file.path : doctor.imageUrl;

        await Doctor.update(
            { emri,mbiemri,adresa,nrTel,specializimi,email,password,imageUrl,depID },
            {where: {
                nrPersonal
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