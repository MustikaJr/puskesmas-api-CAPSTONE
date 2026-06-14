const prisma = require('../config/prisma');
const { generateNomorAntrean } = require('../utils/generateAntrean');

const daftarAntrean = async (userId, data) => {
  const pasien = await prisma.pasien.findUnique({ where: { userId } });
  if (!pasien) {
    const err = new Error('Data pasien tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  const jadwal = await prisma.jadwal.findUnique({ where: { id: data.jadwalId } });
  if (!jadwal) {
    const err = new Error('Jadwal tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const count = await prisma.antrean.count({
    where: { jadwalId: data.jadwalId, createdAt: { gte: today } },
  });
  if (count >= jadwal.kuota) {
    const err = new Error('Kuota antrean untuk jadwal ini sudah penuh');
    err.statusCode = 400;
    throw err;
  }

  const nomorAntrean = await generateNomorAntrean(prisma, data.jadwalId);

  const antrean = await prisma.antrean.create({
    data: {
      pasienId: pasien.id,
      jadwalId: data.jadwalId,
      nomorAntrean,
      keluhan: data.keluhan,
    },
    include: {
      jadwal: { include: { dokter: true } },
    },
  });

  return antrean;
};

const getAntreanSaya = async (userId) => {
  const pasien = await prisma.pasien.findUnique({ where: { userId } });
  if (!pasien) {
    const err = new Error('Data pasien tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  return prisma.antrean.findMany({
    where: { pasienId: pasien.id },
    include: { jadwal: { include: { dokter: true } } },
    orderBy: { createdAt: 'desc' },
  });
};

const getAllAntrean = async (status) => {
  const where = status ? { status } : {};
  return prisma.antrean.findMany({
    where,
    include: {
      pasien: { include: { user: { select: { name: true, email: true } } } },
      jadwal: { include: { dokter: true } },
    },
    orderBy: { createdAt: 'asc' },
  });
};

const updateStatus = async (antreanId, status) => {
  const antrean = await prisma.antrean.findUnique({ where: { id: antreanId } });
  if (!antrean) {
    const err = new Error('Antrean tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  return prisma.antrean.update({
    where: { id: antreanId },
    data: { status },
  });
};

module.exports = { daftarAntrean, getAntreanSaya, getAllAntrean, updateStatus };
