function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Admins only.' });
}

function isUser(req, res, next) {
  if (req.user && req.user.role === 'user') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Users only.' });
}

module.exports = { isAdmin, isUser };
