import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/gallery";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    // Hilangkan spasi pada nama asli file agar URL tidak berantakan
    const originalname = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    // Memastikan hanya file gambar yang boleh diunggah
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Hanya file gambar (jpg, png, webp) yang diizinkan!"));
    }
  },
});

export default upload;
