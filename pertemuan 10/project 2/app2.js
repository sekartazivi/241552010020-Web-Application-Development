document.querySelector('#formulir')
        .addEventListener('submit', e => {
    e.preventDefault();

    // Validasi seluruh field secara bersamaan
const semuaValid = [
    validasi('nama',
        v => v.length >= 3, 'Min. 3 karakter'),
    validasi('email',
        v => /\S+@\S+/.test(v), 'Email tidak valid'),
validasi('password',
        v => v.length >= 8, 'Min. 8 karakter'),
].every(Boolean);

if (!semuaValid) return; // ada field yang tidak valid

document.querySelector('#sukses')
    .classList.remove('tersembunyi');
document.querySelector('#formulir')
    .classList.add('tersembunyi');

    // Redirect setelah 2 detik
setTimeout(() => {
    window.location.href = '/dashboard';
}, 2000);
});