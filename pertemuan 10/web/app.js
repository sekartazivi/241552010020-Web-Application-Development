// app.js - Logika Utama Halaman Web Interaktif

// ==========================================
// 1. FITUR DARK MODE (DENGAN LOCALSTORAGE)
// ==========================================
const tombolTema = document.querySelector('#theme-btn');

// Cek di awal apakah user sebelumnya pernah mengaktifkan mode gelap
if (localStorage.getItem('tema') === 'gelap') {
    document.body.classList.add('gelap');
    tombolTema.textContent = '☀️ Mode Terang';
}

tombolTema.addEventListener('click', () => {
    // Switch kelas 'gelap' di tag body
    document.body.classList.toggle('gelap');
    
    // Cek apakah sekarang posisinya gelap atau terang
    const apakahGelap = document.body.classList.contains('gelap');
    
    // Simpan pilihan user ke browser dan ganti teks tombol
    if (apakahGelap) {
        localStorage.setItem('tema', 'gelap');
        tombolTema.textContent = '☀️ Mode Terang';
    } else {
        localStorage.setItem('tema', 'terang');
        tombolTema.textContent = '🌙 Mode Gelap';
    }
});


// ==========================================
// 2. FITUR TAB NAVIGATION (KOMPONEN UI)
// ==========================================
const semuaTombolTab = document.querySelectorAll('.tombol-tab');
const semuaPanelTab  = document.querySelectorAll('.panel-tab');

semuaTombolTab.forEach(tombol => {
    tombol.addEventListener('click', () => {
        // Hapus kelas 'aktif' dari tombol tab yang lain
        semuaTombolTab.forEach(t => t.classList.remove('aktif'));
        // Tambahkan kelas 'aktif' ke tombol yang baru diklik
        tombol.classList.add('aktif');

        // Sembunyikan semua panel konten terlebih dahulu
        semuaPanelTab.forEach(panel => panel.classList.add('tersembunyi'));
        
        // Munculkan panel yang sesuai dengan data-tab dari tombol yang diklik
        const targetTab = tombol.dataset.tab;
        const panelTarget = document.querySelector(`#${targetTab}`);
        panelTarget.classList.remove('tersembunyi');

        // BONUS KREATIVITAS: Jika membuka tab informasi, jalankan animasi angka
        if (targetTab === 'konten-info') {
            jalankanPenghitung();
        }
    });
});


// ==========================================
// 3. FITUR VALIDASI FORMULIR REAL-TIME
// ==========================================
const form = document.querySelector('#formulir');
const inputNama = document.querySelector('#nama');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');

// Fungsi pembantu untuk memvalidasi dan memunculkan pesan error
function validasiInput(inputElement, kondisiFungsi, pesanError) {
    const tempatPesan = inputElement.parentElement.querySelector('.pesan-error');
    
    if (!kondisiFungsi(inputElement.value)) {
        tempatPesan.textContent = pesanError;
        return false; // Gagal validasi
    } else {
        tempatPesan.textContent = '';
        return true; // Lolos validasi
    }
}

// Cek kekuatan password real-time saat diketik (Indikator Password)
inputPassword.addEventListener('input', () => {
    const bilahIsian = document.querySelector('.isian');
    const panjangPassword = inputPassword.value.length;

    if (panjangPassword === 0) {
        bilahIsian.style.width = '0%';
    } else if (panjangPassword < 5) {
        bilahIsian.style.width = '30%';
        bilahIsian.style.backgroundColor = '#e53e3e'; // Merah (Lemah)
    } else if (panjangPassword >= 5 && panjangPassword < 8) {
        bilahIsian.style.width = '60%';
        bilahIsian.style.backgroundColor = '#dd6b20'; // Oranye (Sedang)
    } else {
        bilahIsian.style.width = '100%';
        bilahIsian.style.backgroundColor = '#38a169'; // Hijau (Kuat)
    }
});

// Penanganan submit formulir
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman refresh otomatis

    // Jalankan validasi untuk ketiga field
    const namaValid = validasiInput(inputNama, v => v.length >= 3, 'Nama minimal harus 3 karakter!');
    const emailValid = validasiInput(inputEmail, v => /\S+@\S+\.\S+/.test(v), 'Format email tidak valid!');
    const passwordValid = validasiInput(inputPassword, v => v.length >= 8, 'Password minimal harus 8 karakter!');

    // Jika ada salah satu yang tidak valid, batalkan proses
    if (!namaValid || !emailValid || !passwordValid) return;

    // Jika semua valid, hilangkan form dan munculkan pesan sukses
    const notifSukses = document.querySelector('#sukses');
    notifSukses.classList.remove('tersembunyi');
    
    // Opsional: Reset form setelah berhasil
    form.reset();
    document.querySelector('.isian').style.width = '0%';
});


// ==========================================
// 4. KREATIVITAS: ANIMASI ANGKA PENGHITUNG
// ==========================================
function jalankanPenghitung() {
    const kartuStat = document.querySelector('.kartu-stat');
    const elemenAngka = kartuStat.querySelector('.penghitung');
    const targetAngka = +kartuStat.dataset.target; // Mengambil angka 1200 dari HTML
    
    let angkaAwal = 0;
    const kecepatan = targetAngka / 60; // Mengatur kelancaran animasi

    const updateAngka = () => {
        angkaAwal = Math.min(angkaAwal + kecepatan, targetAngka);
        elemenAngka.textContent = Math.floor(angkaAwal).toLocaleString();

        if (angkaAwal < targetAngka) {
            requestAnimationFrame(updateAngka);
        }
    };

    requestAnimationFrame(updateAngka);
}