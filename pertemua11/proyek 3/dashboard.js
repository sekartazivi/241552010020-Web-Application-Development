const linkCSS = document.createElement('link');
linkCSS.rel = 'stylesheet';
linkCSS.href = 'style3.css';
document.head.appendChild(linkCSS);

const body = document.body;

const nav = document.createElement('nav');
nav.className = 'tab-nav';

const tabsData = [
    { id: 'ikhtisar', label: 'Ikhtisar' },
    { id: 'statistik', label: 'Statistik' },
    { id: 'pengaturan', label: 'Pengaturan' }
];

tabsData.forEach((tab, index) => {
    const btn = document.createElement('button');
    btn.className = 'tombol-tab' + (index === 0 ? ' aktif' : '');
    btn.setAttribute('data-tab', tab.id);
    btn.textContent = tab.label;
    nav.appendChild(btn);
});
body.appendChild(nav);

const secIkhtisar = document.createElement('section');
secIkhtisar.id = 'ikhtisar';
secIkhtisar.className = 'panel aktif';

const gridStat = document.createElement('div');
gridStat.className = 'grid-statistik';

const kartuStat = document.createElement('div');
kartuStat.className = 'kartu-stat';
kartuStat.setAttribute('data-target', '5000');

const h3Penghitung = document.createElement('h3');
h3Penghitung.className = 'penghitung';
h3Penghitung.textContent = '0';

const pDeskripsi = document.createElement('p');
pDeskripsi.textContent = 'Total Pengguna';

kartuStat.appendChild(h3Penghitung);
kartuStat.appendChild(pDeskripsi);
gridStat.appendChild(kartuStat);
secIkhtisar.appendChild(gridStat);
body.appendChild(secIkhtisar);

const secStatistik = document.createElement('section');
secStatistik.id = 'statistik';
secStatistik.className = 'panel';
secStatistik.innerHTML = '<div class="kartu-stat"><h3>Grafik/Data belum ditambahkan</h3></div>';
body.appendChild(secStatistik);

const secPengaturan = document.createElement('section');
secPengaturan.id = 'pengaturan';
secPengaturan.className = 'panel';

const btnAccordion = document.createElement('button');
btnAccordion.className = 'judul-akordion';
btnAccordion.textContent = 'Tema Tampilan';

const kontenAccordion = document.createElement('div');
kontenAccordion.className = 'konten-akordion';

const temaTersimpan = localStorage.getItem('tema') === 'gelap';
if (temaTersimpan) body.classList.add('gelap');

const btnTheme = document.createElement('button');
btnTheme.id = 'theme-btn';
btnTheme.textContent = temaTersimpan ? 'Alihkan Mode Terang' : 'Alihkan Mode Gelap';

kontenAccordion.appendChild(btnTheme);
secPengaturan.appendChild(btnAccordion);
secPengaturan.appendChild(kontenAccordion);
body.appendChild(secPengaturan);


function gantiTab(tabId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('aktif');
    });
    document.querySelectorAll('.tombol-tab').forEach(btn => {
        btn.classList.remove('aktif');
    });
    
    document.getElementById(tabId).classList.add('aktif');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('aktif');
}

document.querySelectorAll('.tombol-tab').forEach(btn => {
    btn.addEventListener('click', () => gantiTab(btn.dataset.tab));
});

function jalankanPenghitung() {
    document.querySelectorAll('.kartu-stat').forEach(kartu => {
        const el = kartu.querySelector('.penghitung');
        if (!el) return;
        const target = +kartu.dataset.target;
        let n = 0;
        const langkah = target / 60;
        
        const jalankan = () => {
            n = Math.min(n + langkah, target);
            el.textContent = Math.floor(n).toLocaleString();
            if (n < target) requestAnimationFrame(jalankan);
        };
        requestAnimationFrame(jalankan);
    });
}
jalankanPenghitung();

btnTheme.addEventListener('click', () => {
    body.classList.toggle('gelap');
    const isDark = body.classList.contains('gelap');
    localStorage.setItem('tema', isDark ? 'gelap' : 'terang');
    btnTheme.textContent = isDark ? 'Alihkan Mode Terang' : 'Alihkan Mode Gelap';
});
