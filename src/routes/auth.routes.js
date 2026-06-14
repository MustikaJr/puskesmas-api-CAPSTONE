const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi pengguna
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi pasien baru
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, nik, noHp, tanggalLahir, alamat]
 *             properties:
 *               name: { type: string, example: "Budi Santoso" }
 *               email: { type: string, example: "budi@email.com" }
 *               password: { type: string, example: "password123" }
 *               nik: { type: string, example: "1234567890123456" }
 *               noHp: { type: string, example: "081234567890" }
 *               tanggalLahir: { type: string, example: "1990-01-15" }
 *               alamat: { type: string, example: "Jl. Merdeka No. 1" }
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Validasi gagal
 *       409:
 *         description: Email sudah terdaftar
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "budi@email.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token JWT
 *       401:
 *         description: Email atau password salah
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Ambil profil user yang sedang login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Data profil berhasil diambil
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticate, getProfile);

module.exports = router;
