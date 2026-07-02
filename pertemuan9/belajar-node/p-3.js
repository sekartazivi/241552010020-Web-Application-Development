const kalkulator = {
    tambah : (a, b) => a + b,
    kurang : (a, b) => a - b,
    kali : (a, b) => a * b,
    bagi : (a, b) => a / b,
    pangkat : (a, b) => a ** b
};
console.log(kalkulator.tambah(10,5)); // Output: 15
console.log(kalkulator.bagi(10,0)); // Output: Infinity
console.log(kalkulator.pangkat(2,8 )); // Output: 256

function terapkan(arr, fn) { return arr.map(fn); }
console.log(terapkan([1,2,3,4], x => x**2)); // [1,4,9,16]
console.log(terapkan([1,2,3,4], x => x%2===0)); // [false,true,false,true]

function buatRekening(saldoAwal) {
let saldo = saldoAwal;
return {
setor: (n) => { saldo += n; console.log(`Saldo: ${saldo}`); },
tarik: (n) => { if (n > saldo) { console.log('Saldo kurang!'); return; }
saldo -= n; console.log(`Saldo: ${saldo}`); },
cek: () => saldo,
};
}

const rekening = buatRekening(500000);
rekening.setor(200000); // Saldo: 700000
rekening.tarik(1000000); // Saldo kurang!
rekening.tarik(100000); // Saldo: 600000