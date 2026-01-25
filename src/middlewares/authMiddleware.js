import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  // Memastikan header ada dan menggunakan format 'Bearer <token>'
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token diperlukan, silakan login" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token tidak valid atau kedaluwarsa" });
  }
};

export const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses ditolak, khusus Admin" });
  }
  next();
};
