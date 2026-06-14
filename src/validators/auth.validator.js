const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  noHp: z.string().min(10, 'Nomor HP tidak valid'),
  tanggalLahir: z.string().refine((d) => !isNaN(Date.parse(d)), 'Format tanggal tidak valid'),
  alamat: z.string().min(5, 'Alamat terlalu pendek'),
});

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

module.exports = { registerSchema, loginSchema };
