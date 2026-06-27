const express = require('express');
const router = express.Router();
const { getAllDokter, getDokterById, getJadwalDokter } = require('../controllers/dokter.controller');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Dokter
 *   description: Informasi dokter dan jadwal
 */

router.get('/', authenticate, getAllDokter);

router.get('/:id', authenticate, getDokterById);

/**
 * @swagger
 * /api/dokter/{id}/jadwal:
 *   get:
 *     summary: Ambil jadwal dokter berdasarkan ID dokter
 *     tags: [Dokter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Berhasil
 *       404:
 *         description: Dokter tidak ditemukan
 */
router.get('/:id/jadwal', authenticate, getJadwalDokter);

module.exports = router;