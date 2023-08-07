const express = require('express');
const router = express.Router();
const db = require('../../config');


// Get data Pembayaran by ID Pelanggan
router.get('/pelanggan/pembayaran/:id_pelanggan', (req, res) => {
    const { id_pelanggan } = req.params;

    const checkQuery = 'SELECT * FROM pembayaran WHERE id_pelanggan = ?';
    db.query(checkQuery, [id_pelanggan], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error executing MySQL query:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        return res.status(200).json(checkResults);
    });
});

// Insert data Pembayaran Tagihan Pelanggan by ID Tagihan
router.post('/pelanggan/pembayaran/tagihan/:id_tagihan', (req, res) => {
    const idTagihan = req.params.id_tagihan;
    const { total_bayar } = req.body;

    if (!total_bayar) {
        return res.status(400).json({ message: 'Semua bagian harus diisi' });
    }

    const selectIdPelanggan = 'SELECT id_pelanggan, nama_pelanggan, bulan, tahun, jumlah_tagihan FROM tagihan WHERE id_tagihan = ?';
    const selectUsername = 'SELECT username FROM pelanggan WHERE id_pelanggan = ?';
    const selectIdUser = 'SELECT id_user FROM user WHERE username = ?';
    const insertPembayaran = 'INSERT INTO pembayaran (id_tagihan, id_pelanggan, username, nama_pelanggan, id_user, tanggal_pembayaran, bulan, tahun, total_bayar, biaya_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const updateStatus = 'UPDATE tagihan SET status = 2 WHERE id_tagihan = ?';

    db.query(selectIdPelanggan, [idTagihan], (selectIdPelangganErr, selectIdPelangganResults) => {
        if (selectIdPelangganErr) {
            console.error('Error executing MySQL query:', selectIdPelangganErr);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (selectIdPelangganResults.length === 0) {
            return res.status(400).json({ message: 'Id_tagihan tidak valid' });
        }

        const idPelanggan = selectIdPelangganResults[0].id_pelanggan;
        const nama_pelanggan = selectIdPelangganResults[0].nama_pelanggan;
        const bulan_bayar = selectIdPelangganResults[0].bulan;
        const tahun_bayar = selectIdPelangganResults[0].tahun;
        const jumlah_tagihan = selectIdPelangganResults[0].jumlah_tagihan;

        const total_bayar_penuh = jumlah_tagihan + 2000;

        if (Number(total_bayar) !== total_bayar_penuh) {
            return res.status(400).json({ message: 'Total bayar tidak sama dengan jumlah tagihan ditambah biaya admin' });
        }

        db.query(selectUsername, [idPelanggan], (selectUsernameErr, selectUsernameResults) => {
            if (selectUsernameErr) {
                console.error('Error executing MySQL query:', selectUsernameErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (selectUsernameResults.length === 0) {
                return res.status(400).json({ message: 'Id_pelanggan tidak valid' });
            }

            const username = selectUsernameResults[0].username;

            db.query(selectIdUser, [username], (selectIdUserErr, selectIdUserResults) => {
                if (selectIdUserErr) {
                    console.error('Error executing MySQL query:', selectIdUserErr);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (selectIdUserResults.length === 0) {
                    return res.status(400).json({ message: 'Username tidak valid' });
                }

                const idUser = selectIdUserResults[0].id_user;

                const insertPembayaranData = [idTagihan, idPelanggan, username, nama_pelanggan, idUser, new Date(), bulan_bayar, tahun_bayar, Number(total_bayar), 2000];

                db.query(insertPembayaran, insertPembayaranData, (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error executing MySQL query:', insertErr);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    if (insertResults.affectedRows === 0) {
                        return res.status(400).json({ message: 'Tagihan sudah dibayar' });
                    }

                    db.query(updateStatus, [idTagihan], (updateErr) => {
                        if (updateErr) {
                            console.error('Error executing MySQL query:', updateErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }

                        return res.status(200).json({ message: 'Insert pembayaran berhasil' });
                    });
                });
            });
        });
    });
});



module.exports = router;