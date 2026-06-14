const { z } = require('zod');

const daftarAntreanSchema = z.object({
  jadwalId: z.number().int().positive('Jadwal ID tidak valid'),
  keluhan: z.string().min(3, 'Keluhan terlalu pendek').optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['WAITING', 'CALLED', 'DONE', 'SKIP'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
});

module.exports = { daftarAntreanSchema, updateStatusSchema };
