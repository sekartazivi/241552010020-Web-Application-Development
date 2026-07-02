// dashboard.js - menggabungkan semua komponen

// 1. Tab Navigation
document.querySelectorAll('.tombol-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        gantiTab(btn.dataset.tab);
    });
});

// 2. Animasi penghitung statistik
function jalankanPenghitung() {
    document.querySelectorAll('.kartu-stat').forEach(kartu => {
        const el       = kartu.querySelector('.penghitung');
        const target   = +kartu.dataset.target;
        let n = 0; const langkah = target / 60;
        const jalankan = () => {
            n = Math.min(n + langkah, target);
            el.textContent = Math.floor(n).toLocaleString();
            if (n < target) requestAnimationFrame(jalankan);
        };
        requestAnimationFrame(jalankan);
    });
}

jalankanPenghitung();

// 3. Accordion & 4. Dark Mode
// Implementasi identik dengan subbab 2.1 dan 2.2
// (Silakan tambahkan fungsi gantiTab(), logika akordion, dan dark mode kamu di sini)