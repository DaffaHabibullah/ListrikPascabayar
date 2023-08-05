const express = require('express');
const router = express.Router();
const db = require('../../config');


// Update data Pelanggan
router.put('/pelanggan/update/:id_pelanggan', (req, res) => {
    const { id_pelanggan } = req.params;
    const { nomor_kwh, nama_pelanggan, alamat, id_tarif } = req.body;

    if (!nomor_kwh || !nama_pelanggan || !alamat || !id_tarif) {
        return res.status(400).json({ message: 'Semua bagian harus diisi' });
    }

    if (nomor_kwh.length !== 12) {
        return res.status(400).json({ message: 'Nomor KWH harus 12 digit' });
    }

    const checkQuery = 'SELECT id_pelanggan FROM pelanggan WHERE nomor_kwh = ? AND id_pelanggan != ?';
    db.query(checkQuery, [nomor_kwh, id_pelanggan], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error executing MySQL query:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ message: 'Nomor KWH sudah digunakan oleh pelanggan lain' });
        }

        const updatePelangganQuery = 'UPDATE pelanggan SET nomor_kwh = ?, nama_pelanggan = ?, alamat = ?, id_tarif = ? WHERE id_pelanggan = ?';
        db.query(updatePelangganQuery, [nomor_kwh, nama_pelanggan, alamat, id_tarif, id_pelanggan], (updatePelangganErr, updatePelangganResult) => {
            if (updatePelangganErr) {
                console.error('Error executing MySQL query:', updatePelangganErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (updatePelangganResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Data pelanggan dengan ID tersebut tidak ditemukan' });
            }
            return res.status(200).json({ message: 'Data pelanggan berhasil diubah' });
        });
    });
});



module.exports = router;