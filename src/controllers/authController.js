import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi input
    if (!nama || !email || !password) {
      return res.status(400);
      (1).json({ msg: "Nama, email, dan password wajib diisi" });
    }

    // Cek apakah email sudah terdaftar
    const exist = await UserModel.emailExists(email);
    if (exist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // buat user baru
    const newUser = await UserModel.createNewUser(nama, email, hashed);

    // generat token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: { id: newUser.id, name: newUser.nama, email: newUser.email },
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //cari user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    //cek password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Password salah" });
    }

    //generat token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: { id: user.id, name: user.nama, email: user.email },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
1;
