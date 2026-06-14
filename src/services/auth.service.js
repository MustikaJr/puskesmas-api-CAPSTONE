const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const register = async (data) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    const err = new Error('Email sudah terdaftar');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'PASIEN',
      pasien: {
        create: {
          nik: data.nik,
          noHp: data.noHp,
          tanggalLahir: new Date(data.tanggalLahir),
          alamat: data.alamat,
        },
      },
    },
    include: { pasien: true },
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const login = async (data) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    const err = new Error('Email atau password salah');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    const err = new Error('Email atau password salah');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { pasien: true },
  });
  if (!user) {
    const err = new Error('User tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = { register, login, getProfile };
