/*
  Warnings:

  - You are about to drop the column `jenis` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `kategori` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to alter the column `jumlah` on the `Transaksi` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `nama` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaksi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaksi" ("createdAt", "id", "jumlah", "tanggal", "updatedAt", "userId") SELECT "createdAt", "id", "jumlah", "tanggal", "updatedAt", "userId" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
