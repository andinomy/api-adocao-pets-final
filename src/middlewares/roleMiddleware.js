function roleMiddleware(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ mensagem: 'Acesso negado' });
    }

    return next();
  };
}

module.exports = roleMiddleware;
