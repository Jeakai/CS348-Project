module.exports = (err, req, res, next) => {
  // console.log('Request:', req);
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
