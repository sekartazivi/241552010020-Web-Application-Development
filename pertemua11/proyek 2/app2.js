const linkCSS = document.createElement('link');
linkCSS.rel = 'stylesheet';
linkCSS.href = 'style2.css';
document.head.appendChild(linkCSS);

const body = document.body;

const form = document.createElement('form');
form.id = 'formulir';

function buatField(labelText, inputId, inputType, placeholderText = '') {
    const div = document.createElement('div');
    div.className = 'field';

    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.id = inputId;
    input.type = inputType;
    if (placeholderText) input.placeholder = placeholderText;

    const spanError = document.createElement('span');
    spanError.className = 'pesan-error';

    div.appendChild(label);
    div.appendChild(input);
    
    if (inputId === 'password') {
        const bilah = document.createElement('div');
        bilah.className = 'bilah';
        const isian = document.createElement('div');
        isian.className = 'isian';
        bilah.appendChild(isian);
        div.appendChild(bilah);
    }

    div.appendChild(spanError);
    return div;
}

form.appendChild(buatField('Nama Lengkap', 'nama', 'text', 'Minimal 3 karakter'));
form.appendChild(buatField('Alamat Email', 'email', 'email'));
form.appendChild(buatField('Password', 'password', 'password'));

const btnSubmit = document.createElement('button');
btnSubmit.type = 'submit';
btnSubmit.textContent = 'Daftar Sekarang';
form.appendChild(btnSubmit);

// Membuat Notifikasi Sukses
const divSukses = document.createElement('div');
divSukses.id = 'sukses';
divSukses.className = 'tersembunyi';
divSukses.innerHTML = '✓ Berhasil!';
form.appendChild(divSukses);

body.appendChild(form);

function validasi(idInput, aturanKondisi) {
    const inputEl = document.getElementById(idInput);
    const errorEl = inputEl.parentElement.querySelector('.pesan-error');
    const nilai = inputEl.value.trim();

    const hasilAturan = aturanKondisi(nilai);


    if (typeof hasilAturan === 'string') {
        errorEl.textContent = hasilAturan;
        return false;
    } else if (hasilAturan === false) {
        return false;
    } else {
        errorEl.textContent = ''; // Bersih jika valid
        return true;
    }
}

document.getElementById('password').addEventListener('input', (e) => {
    const isian = document.querySelector('.isian');
    const len = e.target.value.length;
    if (len === 0) { isian.style.width = '0%'; }
    else if (len < 5) { isian.style.width = '30%'; isian.style.backgroundColor = '#dc3545'; }
    else if (len < 8) { isian.style.width = '60%'; isian.style.backgroundColor = '#ffc107'; }
    else { isian.style.width = '100%'; isian.style.backgroundColor = '#28a745'; }
});

document.querySelector('#formulir').addEventListener('submit', e => {
    e.preventDefault();

    const semuaValid = [
        validasi('nama', v => v.length >= 3 ? true : 'Min. 3 karakter'),
        validasi('email', v => /\S+@\S+\.\S+/.test(v) ? true : 'Email tidak valid'),
        validasi('password', v => v.length >= 8 ? true : 'Min. 8 karakter')
    ].every(Boolean);

    if (!semuaValid) return;

    document.querySelector('#sukses').classList.remove('tersembunyi');
    document.querySelector('#formulir').querySelectorAll('.field, button').forEach(el => {
        el.classList.add('tersembunyi');
    });


    setTimeout(() => {
        alert('Mengalihkan halaman ke /dashboard...');
        window.location.href = '/dashboard';
    }, 2000);
});
