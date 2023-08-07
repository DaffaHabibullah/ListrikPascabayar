const express = require('express');
const router = express.Router();
const db = require('../../config');


// Get data Tagihan by ID Pelanggan
router.get('/pelanggan/tagihan/:id_pelanggan', (req, res) => {
    const { id_pelanggan } = req.params;

    const checkQuery = 'SELECT * FROM tagihan WHERE id_pelanggan = ?';
    db.query(checkQuery, [id_pelanggan], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error executing MySQL query:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json(checkResults);
    });
});



module.exports = router;