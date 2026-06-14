const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Mulai seeding...');

  // Hapus data lama (urutan penting!)
  await prisma.antrean.deleteMany();
  await prisma.jadwal.deleteMany();
  await prisma.pasien.deleteMany();
  await prisma.dokter.deleteMany();
  await prisma.user.deleteMany();

  // Buat akun petugas
  const petugasPassword = await bcrypt.hash('petugas123', 10);
  await prisma.user.create({
    data: {
      name: 'Petugas Puskesmas',
      email: 'petugas@puskesmas.com',
      password: petugasPassword,
      role: 'PETUGAS',
    },
  });

  // Buat akun pasien
  const pasienPassword = await bcrypt.hash('pasien123', 10);
  const pasien1 = await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi@email.com',
      password: pasienPassword,
      role: 'PASIEN',
      pasien: {
        create: {
          nik: '1371010101900001',
          noHp: '081234567890',
          tanggalLahir: new Date('1990-01-15'),
          alamat: 'Jl. Merdeka No. 1, Padang',
        },
      },
    },
    include: { pasien: true },
  });

  const pasien2 = await prisma.user.create({
    data: {
      name: 'Siti Rahayu',
      email: 'siti@email.com',
      password: pasienPassword,
      role: 'PASIEN',
      pasien: {
        create: {
          nik: '1371010202950002',
          noHp: '082345678901',
          tanggalLahir: new Date('1995-02-20'),
          alamat: 'Jl. Sudirman No. 5, Padang',
        },
      },
    },
    include: { pasien: true },
  });

  // Buat dokter
  const dokter1 = await prisma.dokter.create({
    data: {
      nama: 'dr. Ahmad Fauzi',
      spesialisasi: 'Umum',
      noStr: 'STR-001-2024',
    },
  });

  const dokter2 = await prisma.dokter.create({
    data: {
      nama: 'dr. Rina Wati',
      spesialisasi: 'Anak',
      noStr: 'STR-002-2024',
    },
  });

  // Buat jadwal
  const jadwal1 = await prisma.jadwal.create({
    data: {
      dokterId: dokter1.id,
      hari: 'SENIN',
      jamMulai: '08:00',
      jamSelesai: '12:00',
      kuota: 20,
    },
  });

  const jadwal2 = await prisma.jadwal.create({
    data: {
      dokterId: dokter1.id,
      hari: 'RABU',
      jamMulai: '13:00',
      jamSelesai: '17:00',
      kuota: 20,
    },
  });

  const jadwal3 = await prisma.jadwal.create({
    data: {
      dokterId: dokter2.id,
      hari: 'SELASA',
      jamMulai: '08:00',
      jamSelesai: '11:00',
      kuota: 15,
    },
  });

  // Buat data antrean awal
  await prisma.antrean.create({
    data: {
      pasienId: pasien1.pasien.id,
      jadwalId: jadwal1.id,
      nomorAntrean: 'A001',
      status: 'DONE',
      keluhan: 'Demam dan batuk sudah 3 hari',
    },
  });

  await prisma.antrean.create({
    data: {
      pasienId: pasien2.pasien.id,
      jadwalId: jadwal1.id,
      nomorAntrean: 'A002',
      status: 'WAITING',
      keluhan: 'Sakit kepala dan pusing',
    },
  });

  await prisma.antrean.create({
    data: {
      pasienId: pasien1.pasien.id,
      jadwalId: jadwal3.id,
      nomorAntrean: 'A001',
      status: 'CALLED',
      keluhan: 'Kontrol anak usia 1 tahun',
    },
  });

  console.log('✅ Seeding selesai!');
  console.log('');
  console.log('📋 Akun untuk testing:');
  console.log('   Petugas → petugas@puskesmas.com / petugas123');
  console.log('   Pasien 1 → budi@email.com / pasien123');
  console.log('   Pasien 2 → siti@email.com / pasien123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
