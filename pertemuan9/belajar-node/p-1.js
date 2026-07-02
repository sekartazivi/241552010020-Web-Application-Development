let angka ="42";
let desimal ='3,14';
let boolStr = 'true';

console.log(typeof angka); // Output: string
console.log(Number(angka)); // Output: 42
console.log(Number(desimal)); // Output: NaN
console.log(Boolean(boolStr)); // Output: true
console.log(Boolean('')); // Output: false
console.log(Boolean(0)); // Output: false

const MAX = 100;
let total = 0;
{
    let lokal =50; 
    total = lokal + 25;
}
console.log('Total :', total); // Output: Total : 75
// console.log(lokal); // Error: lokal is not defined   

const kalimat = ' Belajar JavaScript itu seru! ';
console.log(kalimat.trim().toLocaleLowerCase()); // Output: 'belajar javascript itu seru!'
console.log(kalimat.trim().split('').length); // Output: 25
console.log(kalimat.includes('JavaScript')); // Output: true