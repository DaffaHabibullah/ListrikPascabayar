const express = require('express');
const router = express.Router();
const db = require('../../config');


// Get data Tarif Listrik
router.get('/tarif/listrik', (req, res) => {
    const checkQuery = 'SELECT * FROM tarif';
    db.query(checkQuery, (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error executing MySQL query:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json(checkResults);
    });
});



module.exports = router;