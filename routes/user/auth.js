const express = require('express');
const router = express.Router();
const db = require('../../config');
const bcrypt = require('bcrypt');


// Register User
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Semua bagian harus diisi' });
    }

    const selectQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(selectQuery, [username], (selectErr, selectResults) => {
        if (selectErr) {
            console.error('Error executing MySQL query:', selectErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (selectResults.length > 0) {
            return res.status(400).json({ message: 'Username sudah digunakan' });
        }
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Error hashing password:', hashErr);
                return res.status(500).json({ message: 'Internal server error' });
            }
            const insertPelangganQuery = 'INSERT INTO pelanggan (username, password) VALUES (?, ?)';
            db.query(insertPelangganQuery, [username, hashedPassword], (insertPelangganErr, insertPelangganResults) => {
                if (insertPelangganErr) {
                    console.error('Error executing MySQL query:', insertPelangganErr);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                const id_pelanggan = insertPelangganResults.insertId;

                const insertUserQuery = 'INSERT INTO user (username, password, id_level, id_pelanggan) VALUES (?, ?, 2, ?)';
                db.query(insertUserQuery, [username, hashedPassword, id_pelanggan], (insertUserErr) => {
                    if (insertUserErr) {
                        console.error('Error executing MySQL query:', insertUserErr);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    return res.status(200).json({ message: 'Registrasi berhasil' });
                });
            });
        });
    });
});

// Login User
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Semua bagian harus diisi' });
    }

    const selectQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(selectQuery, [username], (selectErr, selectResults) => {
        if (selectErr) {
            console.error('Error executing MySQL query:', selectErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (selectResults.length === 0) {
            return res.status(400).json({ message: 'Username atau password salah' });
        }
        const hashedPassword = selectResults[0].password;

        bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
            if (compareErr) {
                console.error('Error comparing password:', compareErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (compareResult) {
                res.cookie('authenticated', true, { httpOnly: true });
                return res.status(200).json({ message: 'Login berhasil' });
            } else {
                if (password === hashedPassword) {
                    const newHashedPassword = bcrypt.hashSync(password, 10);
                    const updateQuery = 'UPDATE user SET password = ? WHERE username = ?';
                    db.query(updateQuery, [newHashedPassword, username], (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating password:', updateErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        return res.status(200).json({ message: 'Login berhasil' });
                    });
                } else {
                    return res.status(400).json({ message: 'Username atau password salah' });
                }
            }
        });
    });
});



module.exports = router;