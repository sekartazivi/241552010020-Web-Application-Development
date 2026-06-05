const linkCSS = document.createElement('link');
linkCSS.rel = 'stylesheet';
linkCSS.href = 'style1.css'; 
document.head.appendChild(linkCSS);

const body = document.body;

const temaTersimpan = localStorage.getItem('theme');
const apakahGelap = temaTersimpan === 'dark';

const button = document.createElement('button');
button.id = 'theme-btn';
button.textContent = apakahGelap ? 'Mode Terang' : 'Mode Gelap';
body.appendChild(button);

const kartu = document.createElement('div');
kartu.className = 'kartu';

const avatar = document.createElement('div');
avatar.className = 'avatar';

const penghitung = document.createElement('h2');
penghitung.className = 'penghitung';
penghitung.setAttribute('data-target', '5000');
penghitung.textContent = '0';

const deskripsi = document.createElement('p');
deskripsi.textContent = 'Total pengguna';

kartu.appendChild(avatar);
kartu.appendChild(penghitung);
kartu.appendChild(deskripsi);
body.appendChild(kartu);

if (apakahGelap) {
    body.classList.add('gelap');
}

button.addEventListener('click', () => {
    body.classList.toggle('gelap');
    
    // Cek apakah sekarang posisinya sedang gelap
    const d = body.classList.contains('gelap');
    
    localStorage.setItem('theme', d ? 'dark' : 'light');
    
    
    button.textContent = d ? 'Mode Terang' : 'Mode Gelap';
});

const target = +penghitung.dataset.target;
let n = 0;
const langkah = target / 60;

const jalankan = () => {
    n = Math.min(n + langkah, target);
    penghitung.textContent = Math.floor(n).toLocaleString();
    if (n < target) requestAnimationFrame(jalankan);
};

requestAnimationFrame(jalankan);
