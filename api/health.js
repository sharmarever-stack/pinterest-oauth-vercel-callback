module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    service: "pinterest-oauth-vercel-callback",
    timestamp: new Date().toISOString()
  });
};
