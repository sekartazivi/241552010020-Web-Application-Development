// Singleton: satu koneksi untuk seluruh app
// Import di route: const prisma = require("../db")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;