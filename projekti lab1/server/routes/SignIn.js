require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Patient, Doctor, Administrator } = require("../models"); // Import your models
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Patient.findOne({ where: { email } });
        if (!user) user = await Doctor.findOne({ where: { email } });
        if (!user) user = await Administrator.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ success: false, message: "No user found with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password mismatch" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Server error" });
    }
});

module.exports = router;
