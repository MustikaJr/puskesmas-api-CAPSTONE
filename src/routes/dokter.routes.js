/**
 * @swagger
 * /api/dokter:
 *   get:
 *     summary: Ambil semua dokter
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
 *     summary: Ambil detail dokter berdasarkan ID
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