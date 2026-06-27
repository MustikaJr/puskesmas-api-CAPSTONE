const dokterService = require('../services/dokter.service');
const { successResponse } = require('../utils/response');

const getAllDokter = async (req, res, next) => {
  try {
    const dokter = await dokterService.getAllDokter();
    return successResponse(res, 'Data dokter berhasil diambil', dokter);
  } catch (err) {
    next(err);
  }
};

const getDokterById = async (req, res, next) => {
  try {
    const dokter = await dokterService.getDokterById(Number(req.params.id));
    return successResponse(res, 'Data dokter berhasil diambil', dokter);
  } catch (err) {
    next(err);
  }
};

const getJadwalDokter = async (req, res, next) => {
  try {
    const dokter = await dokterService.getJadwalDokter(req.params.id);
    return successResponse(res, 'Jadwal dokter berhasil diambil', dokter);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllDokter, getDokterById, getJadwalDokter };