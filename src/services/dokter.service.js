const prisma = require('../config/prisma');

const getAllDokter = async () => {
  return prisma.dokter.findMany({ include: { jadwal: true } });
};

const getDokterById = async (id) => {
  const dokter = await prisma.dokter.findUnique({
    where: { id },
    include: { jadwal: true },
  });
  if (!dokter) {
    const err = new Error('Dokter tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }
  return dokter;
};

const getJadwalDokter = async (id) => {
  const dokter = await prisma.dokter.findUnique({
    where: { id: Number(id) },
    include: {
      jadwal: {
        include: {
          _count: { select: { antrean: true } },
        },
      },
    },
  });

  if (!dokter) {
    const err = new Error('Dokter tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  return dokter;
};

module.exports = { getAllDokter, getDokterById, getJadwalDokter };
