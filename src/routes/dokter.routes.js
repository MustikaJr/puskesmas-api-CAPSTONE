const express = require('express');
const router = express.Router();
const { getAllDokter, getDokterById } = require('../controllers/dokter.controller');
const { authenticate } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Dokter
 *   description: Informasi dokter dan jadwal
 */

/**
 * @swagger
 * /api/dokter:
 *   get:
 *     summary: Ambil semua data dokter beserta jadwal
 *     tags: [Dokter]
 *     responses:
 *       200:
 *         description: Berhasil
 */
router.get('/', authenticate, getAllDokter);

/**
 * @swagger
 * /api/dokter/{id}:
 *   get:
 *     summary: Ambil data dokter berdasarkan ID
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
router.get('/:id', authenticate, getDokterById);

module.exports = router;
