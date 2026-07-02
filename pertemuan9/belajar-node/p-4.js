const data = [
    {nama:'Budi', jurusan:'TI', nilai:[80,90,85]},
    {nama:'Ani', jurusan:'SI', nilai:[95,88,92]},
    {nama:'Caca', jurusan:'TI', nilai:[60,72,65]},
    { nama:'Dani', jurusan:'SI', nilai:[78,82,80] },
{ nama:'Eka', jurusan:'TI', nilai:[91,88,95] },
];

const withAvg = data.map(m=> ({
    ...m,
    rataRata: m.nilai.reduce((a,b) => a+b, 0) / m.nilai.length
}));
withAvg.forEach(m => console.log(`${m.nama} (${m.jurusan}): Rata-rata = ${m.rataRata.toFixed(2)}`));

const lulus = withAvg.filter(m => m.rataRata >= 75);
console.log('Lulus:', lulus.map(m => m.nama));

const ranking = [...withAvg].sort((a,b) => b.rataRata - a.rataRata);
ranking.forEach((m,i) => console.log(`${i+1}. ${m.nama} — ${m.rataRata.toFixed(1)}`));

const perJurusan = data.reduce((acc, m) => {
    if (!acc[m.jurusan]) acc[m.jurusan] = [];
    acc[m.jurusan].push(m.nama);
    return acc;
}, {});
console.log(perJurusan);