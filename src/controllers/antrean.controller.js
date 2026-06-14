const antreanService = require('../services/antrean.service');
const { successResponse } = require('../utils/response');

const daftarAntrean = async (req, res, next) => {
  try {
    const antrean = await antreanService.daftarAntrean(req.user.id, req.body);
    return successResponse(res, 'Berhasil mendaftar antrean', antrean, 201);
  } catch (err) {
    next(err);
  }
};

const getAntreanSaya = async (req, res, next) => {
  try {
    const antrean = await antreanService.getAntreanSaya(req.user.id);
    return successResponse(res, 'Data antrean berhasil diambil', antrean);
  } catch (err) {
    next(err);
  }
};

const getAllAntrean = async (req, res, next) => {
  try {
    const { status } = req.query;
    const antrean = await antreanService.getAllAntrean(status);
    return successResponse(res, 'Semua data antrean berhasil diambil', antrean);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const antrean = await antreanService.updateStatus(Number(req.params.id), req.body.status);
    return successResponse(res, 'Status antrean berhasil diupdate', antrean);
  } catch (err) {
    next(err);
  }
};

module.exports = { daftarAntrean, getAntreanSaya, getAllAntrean, updateStatus };
