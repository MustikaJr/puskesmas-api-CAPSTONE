# 🏥 Puskesmas Queue API

RESTful API Manajemen Antrean Puskesmas — Capstone Project Neo Telemetri 2026

## Tech Stack
- **Runtime**: Node.js + Express.js
- **Database**: MySQL (via Laragon) + Prisma ORM
- **Auth**: JWT + bcrypt
- **Validation**: Zod
- **Docs**: Swagger

## Setup Lokal

### 1. Clone & Install
```bash
git clone <repo-url>
cd puskesmas-api
npm install
```

### 2. Konfigurasi environment
```bash
cp .env.example .env
```
Edit `.env` sesuai konfigurasi Laragon kamu.

### 3. Buat database
Buka phpMyAdmin / HeidiSQL dan buat database bernama `puskesmas_db`.

### 4. Migrate & Seed
```bash
npm run db:migrate
npm run db:seed
```

### 5. Jalankan server
```bash
npm run dev
```

Server berjalan di `http://localhost:3000`
Swagger UI: `http://localhost:3000/api-docs`

## Environment Variables

| Variable | Contoh | Keterangan |
|---|---|---|
| `DATABASE_URL` | `mysql://root:@localhost:3306/puskesmas_db` | Koneksi MySQL |
| `JWT_SECRET` | `secret_panjang_random` | Secret key JWT |
| `JWT_EXPIRES_IN` | `7d` | Durasi token |
| `PORT` | `3000` | Port server |

## Akun Testing (setelah seed)

| Role | Email | Password |
|---|---|---|
| Petugas | petugas@puskesmas.com | petugas123 |
| Pasien 1 | budi@email.com | pasien123 |
| Pasien 2 | siti@email.com | pasien123 |

## Endpoint

| Method | Endpoint | Role | Keterangan |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Registrasi pasien |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/profile` | All | Profil user login |
| GET | `/api/dokter` | All | Daftar dokter + jadwal |
| GET | `/api/dokter/:id` | All | Detail dokter |
| GET | `/api/dokter/:id/jadwal` | All | Jadwal & kuota dokter |
| POST | `/api/antrean` | Pasien | Daftar antrean |
| GET | `/api/antrean/saya` | Pasien | Antrean milik saya |
| GET | `/api/antrean` | Petugas | Semua antrean (pagination & filter status) |
| GET | `/api/antrean/:id` | All | Detail antrean |
| PATCH | `/api/antrean/:id/status` | Petugas | Update status antrean |

## Dokumen Pendukung
- ERD: https://drive.google.com/file/d/1NLYGxY-7Ns2M44nxv3kZCsGvBmByKObM/view?usp=drive_link
- Postman Collection: https://drive.google.com/file/d/1Efraf5klqakNsCYbK2smLsp9q1nuie4I/view?usp=sharing

## Link Deploy
> next progress 