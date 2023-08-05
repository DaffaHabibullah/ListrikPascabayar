const express = require('express');
const router = express.Router();
const db = require('../../config');


// Get data Penggunaan by ID Pelanggan
router.get('/pelanggan/penggunaan/:id_pelanggan', (req, res) => {
    const { id_pelanggan } = req.params;

    const checkQuery = 'SELECT * FROM penggunaan WHERE id_pelanggan = ?';
    db.query(checkQuery, [id_pelanggan], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error executing MySQL query:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        return res.status(200).json(checkResults);
    });
});

// Insert data Penggunaan Pelanggan
router.post('/pelanggan/penggunaan/:id_pelanggan', (req, res) => {
    const { id_pelanggan } = req.params;
    const { bulan, tahun, meter_awal, meter_akhir } = req.body;

    if (!bulan || !tahun || !meter_awal || !meter_akhir) {
        return res.status(400).json({ message: 'Semua bagian harus diisi' });
    }

    if (meter_awal > meter_akhir) {
        return res.status(400).json({ message: 'Meter awal tidak boleh lebih besar dari meter akhir' });
    }

    const selectPelangganQuery = 'SELECT nama_pelanggan, id_tarif FROM pelanggan WHERE id_pelanggan = ?';
    db.query(selectPelangganQuery, [id_pelanggan], (selectErr, selectResults) => {
        if (selectErr) {
            console.error('Error executing MySQL query:', selectErr);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Data pelanggan dengan ID tersebut tidak ditemukan' });
        }

        const nama_pelanggan = selectResults[0].nama_pelanggan;
        const idTarif = selectResults[0].id_tarif;

        const insertPenggunaanQuery = 'INSERT INTO penggunaan (id_pelanggan, nama_pelanggan, bulan, tahun, meter_awal, meter_akhir) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertPenggunaanQuery, [id_pelanggan, nama_pelanggan, bulan, tahun, meter_awal, meter_akhir], (insertErr) => {
            if (insertErr) {
                console.error('Error executing MySQL query:', insertErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            const selectLastInsertedPenggunaanIdQuery = 'SELECT LAST_INSERT_ID() as id_penggunaan';
            db.query(selectLastInsertedPenggunaanIdQuery, (selectIdErr, selectIdResults) => {
                if (selectIdErr) {
                    console.error('Error executing MySQL query:', selectIdErr);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                const idPenggunaan = selectIdResults[0].id_penggunaan;
                const selectTarifQuery = 'SELECT tarifperkwh FROM tarif WHERE id_tarif = ?';
                db.query(selectTarifQuery, [idTarif], (selectTarifErr, selectTarifResults) => {
                    if (selectTarifErr) {
                        console.error('Error executing MySQL query:', selectTarifErr);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    const tarifPerKwh = selectTarifResults[0].tarifperkwh;
                    const jumlahMeter = (meter_akhir - meter_awal) * tarifPerKwh;

                    const insertTagihanQuery = 'INSERT INTO tagihan (id_penggunaan, id_pelanggan, nama_pelanggan, bulan, tahun, jumlah_meter) VALUES (?, ?, ?, ?, ?, ?)';
                    db.query(insertTagihanQuery, [idPenggunaan, id_pelanggan, nama_pelanggan, bulan, tahun, jumlahMeter], (insertTagihanErr) => {
                        if (insertTagihanErr) {
                            console.error('Error executing MySQL query:', insertTagihanErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        return res.status(200).json({ message: 'Insert penggunaan dan tagihan berhasil' });
                    });
                });
            });
        });
    });
});



module.exports = router;