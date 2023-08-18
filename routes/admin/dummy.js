const express = require('express');
const router = express.Router();
const db = require('../../config');
const bcrypt = require('bcrypt');


// Create dummy pelaanggan
router.post('/dummy', (req, res) => {
    const dummyPelanggan = req.body.dummyPelanggan || 100;
    const defaultPassword = 'password123';

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomName() {
        const names = [
            'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Daffa', 'Rin', 'Emilia', 'Subaru', 
            'Rem', 'Ram', 'Beatrice', 'Echidna', 'Roswaal', 'Otto', 'Garfiel', 'Frederica', 'Petra', 'Julius', 
            'Reinhard', 'Felix', 'Crusch', 'Anastasia', 'Priscilla', 'Al', 'Felt', 'Reinhard', 'Ricardo', 'Mimi', 
            'Tivey', 'Hetaro', 'Ton', 'Chi', 'Kenta'
        ];
        return names[Math.floor(Math.random() * names.length)];
    }

    function generateRandomAddress() {
        const addresses = ['Jakarta Timur', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Utara'];
        return addresses[Math.floor(Math.random() * addresses.length)];
    }

    const usedKwhNumbers = new Set();

    function insertDummyPelanggan(i) {
        if (i <= dummyPelanggan) {
            const username = `pelanggan${i}`;
            const id_tarif = generateRandomNumber(1, 8);
            const nomor_kwh = generateRandomNumber(100000000000, 999999999999);

            if (usedKwhNumbers.has(nomor_kwh)) {
                insertDummyPelanggan(i);
            } else {
                usedKwhNumbers.add(nomor_kwh);

                bcrypt.hash(defaultPassword, 10, (hashErr, hashedPassword) => {
                    if (hashErr) {
                        console.error('Error hashing password:', hashErr);
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    const nama_pelanggan = generateRandomName();
                    const alamat = generateRandomAddress();

                    const insertPelangganQuery = 'INSERT INTO pelanggan (username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif) VALUES (?, ?, ?, ?, ?, ?)';
                    const insertUserQuery = 'INSERT INTO user (username, password, id_level, id_pelanggan) VALUES (?, ?, 2, LAST_INSERT_ID())';

                    db.query(insertPelangganQuery, [username, hashedPassword, nomor_kwh, nama_pelanggan, alamat, id_tarif], (insertPelangganErr, insertPelangganResults) => {
                        if (insertPelangganErr) {
                            console.error('Error executing MySQL query:', insertPelangganErr);
                            res.status(500).send('Internal Server Error');
                        } else {
                            db.query(insertUserQuery, [username, hashedPassword], (insertUserErr) => {
                                if (insertUserErr) {
                                    console.error('Error executing MySQL query:', insertUserErr);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    console.log(`Inserted dummy user ${username}`);
                                }
                                insertDummyPelanggan(i + 1);
                            });
                        }
                    });
                });
            }
        } else {
            res.send('Dummy pelanggan berhasil dibuat');
        }
    }

    insertDummyPelanggan(1);
});

// Delete all pelanggan
router.delete('/dummy', (req, res) => {
    const deletePelangganQuery = 'DELETE FROM pelanggan';
    db.query(deletePelangganQuery, (deletePelangganErr) => {
        if (deletePelangganErr) {
            console.error('Error executing MySQL query:', deletePelangganErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Delete all Pelanggan successfully' });
    });
});



module.exports = router;