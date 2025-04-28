// 1
function hitungBilanganGanjil(n) {
    let count = 0;
    for (let i = 0; i <= n; i++) {
        if (i % 2 != 0) {
            count++;
        }
    }
    return count;
}

console.log(hitungBilanganGanjil(10))

// 2 
function cekTahunKabisat(tahun) {
    return tahun % 4 === 0;
}

console.log(cekTahunKabisat(2020))

// 3 
function hitungFaktorial(n) {
    let hasil = 1;
    for (let i = n; i > 1; i--) {
        hasil *= i;
    }
    return hasil;
}

console.log(hitungFaktorial(5))

// 4
function cariBilanganPrima(n) {
    const prima = [];
    for (let i = 2; i <= n; i++) {
        let isPrima = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrima = false;
                break;
            }
        }
        if (isPrima) {
            prima.push(i);
        }
    }
    return prima;
}

console.log(cariBilanganPrima(20))

// 5
function hitungJumlahDigit(angka) {
}

// 6
function cekPalindrom(kata) {
    const cleaned = kata.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

console.log(cekPalindrom("katak"))

// 7
function hitungPangkat(angka, pangkat) {
    let hasil = 1;
    for (let i = 0; i < pangkat; i++) {
        hasil *= angka;
    }
    return hasil;
}

console.log(hitungPangkat(2, 3))

// 8
function deretFibonacci(n) {
    const fibo = [0, 1];
    for (let i = 2; i < n + 1; i++) {
        fibo[i] = fibo[i - 1] + fibo[i - 2];
    }
    return fibo[n];
}

console.log(deretFibonacci(5))

// 9
function hitungJumlahKata(kalimat) {
    const words = kalimat.split(' ');
    return words.length;
}

console.log(hitungJumlahKata("Hello World"))

// 10
function cariBilanganTerbesar(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(cariBilanganTerbesar([1, 2, 3, 4, 5]))

// 11
function hitungRataRata(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
  
console.log(hitungRataRata([1, 2, 3, 4, 5]))
  // Ekspektasi hasil:
  // hitungRataRata([1, 2, 3, 4, 5]) => 3


// 12
function hitungJumlahVokal(kata) {
    const vokal = ['a', 'i', 'u', 'e', 'o'];
    let count = 0;
    for (let i = 0; i < kata.length; i++) {
        if (vokal.includes(kata[i].toLowerCase())) {
            count++;
        }
    }
    return count;
}

console.log(hitungJumlahVokal("javascript"))

  // Ekspektasi hasil:
  // hitungJumlahVokal("javascript") => 3
