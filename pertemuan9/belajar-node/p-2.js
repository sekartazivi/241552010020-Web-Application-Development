function hitungGrade(nilai) {
    if (nilai <0 || nilai > 100) return 'Nilai tidak valid';
    if (nilai >= 90) return 'A - Sangat Memuaskan';
    if (nilai >= 80) return 'B - Memuaskan';
    if (nilai >= 70) return 'C - Cukup';
    if (nilai >= 60) return 'D - Kurang';
    return 'E - Tidak Lulus';

}

console.log(hitungGrade(95)); // Output: A - Sangat Memuaskan
console.log(hitungGrade(72)); // Output: C - Cukup
console.log(hitungGrade(150)); // Output: E - Tidak Lulus


for (let i = 1; i <=30; i++) {
    if (i % 15 === 0) {
        console.log(`${i}: FizzBuzz`);
    } else if (i % 3 === 0) {
        console.log(`${i}: Fizz`);
    } else if (i % 5 === 0) {
            console.log(`${i}: Buzz`);
    } else {
            console.log(i);
        }
    }