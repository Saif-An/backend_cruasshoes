import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/user.js";

// Helper function untuk generate token agar kode lebih bersih & konsisten
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      nama: user.nama,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );
};

export const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Nama, email, dan password wajib diisi" });
    }

    const exist = await UserModel.emailExists(email);
    if (exist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createNewUser(nama, email, hashed);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: {
        id: newUser.id,
        name: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Password salah" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
