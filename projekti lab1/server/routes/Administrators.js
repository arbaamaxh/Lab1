const express = require('express');
const router = express.Router();
const { Administrator, Hospital } = require('../models');


// create (insertimi ne tabelen admins)
router.post("/", async (req, res) => {
    try {
        const { emri, mbiemri, nrPersonal, datelindja, adresa, nrTel, email, password, hospitalNrRegjistrimit } = req.body;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (admin) {
            return res.status(400).json({ error: 'This ID is already assigned to an administrator.' });
        }

        const adminEmail = await Administrator.findOne({
            where: { email: email }
        });

        if (adminEmail && adminEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: hospitalNrRegjistrimit
            }
        });

        if (!hospital) {
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        const newAdmin = await Administrator.create({
            emri,
            mbiemri,
            nrPersonal,
            datelindja,
            adresa,
            nrTel,
            email,
            password,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit,
        });

        res.json(newAdmin);
    }
    catch (error) {
        console.error('Error creating administrator:', error);
        res.status(500).json({ error: error.message || 'Failed to create administrator' });
    }
});



// read (me i pa rows ne tabelen admins)
router.get('/', async (req, res) => {
    const allAdmins = await Administrator.findAll();
    res.json(allAdmins);
});

// Get admin details by personal number
router.get('/:nrPersonal', async (req, res) => {
    try {
        const { nrPersonal } = req.params;
        const admin = await Administrator.findOne({
            where: { nrPersonal: nrPersonal },
            attributes: ['emri', 'mbiemri'],
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administrator not found!' });
        }

        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// update (manipulo me te dhena ne tabelen admins)
router.put("/:nrPersonal", async (req, res) => {
    try {
        const { emri, mbiemri, datelindja, adresa, nrTel, email, password } = req.body;
        const nrPersonal = req.params.nrPersonal;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administratori nuk ekziston!' });
        }

        const adminEmail = await Administrator.findOne({
            where: { email: email }
        });

        if (adminEmail && adminEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        await Administrator.update(
            { emri, mbiemri, datelindja, adresa, nrTel, email, password },
            {
                where: {
                    nrPersonal: nrPersonal
                }
            }
        );

        res.status(200).json({ message: 'Administrator updated successfully!' });
    }
    catch (error) {
        console.error('Error updating administrator:', error);
        res.status(500).json({ error: 'Failed to update administrator' });
    }
});


// delete (fshirja e nje admini sipas nrPersonal te tij)
router.delete("/:nrPersonal", async (req, res) => {
    try {
        const nrPersonal = req.params.nrPersonal;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administratori nuk ekziston!' });
        }

        await admin.destroy();

        res.status(200).json({ message: 'Administrator deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting administrator:', error);
        res.status(500).json({ error: 'Failed to delete administrator' });
    }
});

module.exports = router;