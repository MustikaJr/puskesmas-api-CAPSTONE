const generateNomorAntrean = async (prisma, jadwalId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const count = await prisma.antrean.count({
    where: {
      jadwalId,
      createdAt: { gte: today },
    },
  });

  const nomor = String(count + 1).padStart(3, '0');
  return `A${nomor}`;
};

module.exports = { generateNomorAntrean };
