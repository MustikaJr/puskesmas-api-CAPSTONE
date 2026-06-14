const { errorResponse } = require('../utils/response');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Akses ditolak: role tidak memiliki izin', 403);
    }
    next();
  };
};

module.exports = { authorize };
