const express = require('express');
const router = express.Router();
const { daftarAntrean, getAntreanSaya, getAllAntrean, updateStatus } = require('../controllers/antrean.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { daftarAntreanSchema, updateStatusSchema } = require('../validators/antrean.validator');

/**
 * @swagger
 * tags:
 *   name: Antrean
 *   description: Manajemen antrean puskesmas
 */

/**
 * @swagger
 * /api/antrean:
 *   post:
 *     summary: Daftar antrean (pasien)
 *     tags: [Antrean]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jadwalId]
 *             properties:
 *               jadwalId: { type: integer, example: 1 }
 *               keluhan: { type: string, example: "Demam dan batuk" }
 *     responses:
 *       201:
 *         description: Berhasil mendaftar antrean
 *       400:
 *         description: Kuota penuh atau validasi gagal
 */
router.post('/', authenticate, authorize('PASIEN'), validate(daftarAntreanSchema), daftarAntrean);

/**
 * @swagger
 * /api/antrean/saya:
 *   get:
 *     summary: Lihat antrean milik pasien yang login
 *     tags: [Antrean]
 *     responses:
 *       200:
 *         description: Berhasil
 */
router.get('/saya', authenticate, authorize('PASIEN'), getAntreanSaya);

/**
 * @swagger
 * /api/antrean:
 *   get:
 *     summary: Lihat semua antrean (petugas)
 *     tags: [Antrean]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [WAITING, CALLED, DONE, SKIP]
 *         description: Filter berdasarkan status
 *     responses:
 *       200:
 *         description: Berhasil
 *       403:
 *         description: Akses ditolak
 */
router.get('/', authenticate, authorize('PETUGAS'), getAllAntrean);

/**
 * @swagger
 * /api/antrean/{id}/status:
 *   patch:
 *     summary: Update status antrean (petugas)
 *     tags: [Antrean]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [WAITING, CALLED, DONE, SKIP]
 *     responses:
 *       200:
 *         description: Status berhasil diupdate
 *       404:
 *         description: Antrean tidak ditemukan
 */
router.patch('/:id/status', authenticate, authorize('PETUGAS'), validate(updateStatusSchema), updateStatus);

module.exports = router;
