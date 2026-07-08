const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, nama, password } = req.body;
  if (!email || !nama || !password) {
    return res.status(400).json({ message: 'Field wajib diisi' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password minimal 8 karakter' });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email sudah terdaftar' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      nama,
      password: hashed,
      role: 'user'
    }
  });
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json({
    message: 'Registrasi berhasil',
    user: userWithoutPassword
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Field wajib diisi' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email, nama: user.nama, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login berhasil',
    token,
    user: userWithoutPassword
  });
});

module.exports = router;