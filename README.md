# Frontend Mentor - Calculator app solution

![Design preview for the calculator app coding challenge](./public/desktop-preview.jpg)

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

- **Project started:** Feb 3, 2025
- **Project finished:** Feb 4, 2025

## Links

- **Solution URL:** [repository](https://github.com/eLAmaravati/calculator-app)
- **Live Site URL:** [Calculator App](https://langit-calculator-app.netlify.app)

## Tech Stacks

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) v. 19.0.0 - JS library
- [Next.js](https://nextjs.org/) v.15.1.6 - React framework
- [Tailwind CSS](https://styled-components.com/) v.4.0.3 - For styles
- [Mathjs](https://mathjs.org/) - Math library

## Challenges and Approaches

Tantangan yang dihadapi saat ngoding dan pendekatan yang saya lakukan.

### 1. Fungsi Kalkulator

Meskipun ini hanya project hore-hore, tetapi goal-nya tetap: agar aplikasi kalkulator ini berfungsi dengan baik.

- **Operasi matematika beruntun**

Katakanlah pengguna memasukkan operasi matematika seperti ini `5*67+90-7`. Mula-mula, ini menyebabkan eror karena by default, di aplikasi ini operasi matematika hanya bisa dilakukan satu per satu. Solusinya, saya menggunakan library math.js agar operasi matematika yang beruntun ditangani oleh math.js.

*"Kenapa menggunakan library? Kenapa tidak ngoding sendiri?"*

Biar apa? 

- **Ketika tombol "=" ditekan**

Tombol reset pada kalkulator berfungsi untuk menghapus semua input dan hasil perhitungan, mengembalikan kalkulator ke kondisi awal seperti saat pertama kali digunakan. Sedangkan tombol "=" atau "enter" berfungsi untuk menghitung dan menampilkan hasil.

Bila mempertimbangkan user behaviour, ketika sudah menekan tombol "=" dan akan melakukan operasi matematika lainnya, mereka akan langsung memijit tombol lainnya. Perilaku ini akan menyebabkan kalkulator tidak berfungsi karena harus di-reset terlebih dahulu.

Kita perlu menangani itu untuk user experience yang lebih baik. Agar user dapat langsung melakukan operasi matematika lain setelah yang satu selesai tanpa harus menekan tombol "reset".

- **Keystroke dari keyboard**

Agar kalkulator bisa digunakan melalui angka-angka di layar dan input dari keyboard, maka keduanya perlu ditangani secara berbeda. Untuk keyboard, saya menggunakan `eventListener` sementara untuk layar, saya menggunakan event `onClick`.

### 2. Desain

Saya menggunakan Tailwind yang sangat membantu untuk styling terutama layouting. 

- **Lebar kalkulator**

Bila saya menggunakan `class` `w-md` atau sejenisnya untuk mengatur lebar kalkulator, ukurannya jadi tidak proporsional di device ukuran < 375px. 

Solusinya, saya menggunakan unit dvw (dynamic viewport width) untuk menangani handphone seperti ini: `w-[80dvw]`. Sedangkan untuk tab dan layar yang lebih besar tetap menggunakan `class` bawaan Tailwind. Dengan dvw, lebar kalkulator dan seluruh elemen di dalamnya (terutama tombol) tetap kondusif meski di lebar layar kecil seperti 320px.

- **Theme: color name**

Kalkulator ini memiliki 3 tema: default, light, dan dark. User dapat mengganti tema yang diinginkan melalui tombol theme switcher.

Frontend Mentor menyediakan kode warna untuk masing-masing tema. Tapi nama warnanya seperti ini "Very dark grayish yellow: hsl(60, 10%, 19%)". Bukan sesuatu yang mudah diingat ketika dijadikan variabel di Tailwind. 

Jadi, untuk tema light saya menggunakan warna-warna bawaan Tailwind. Untuk tema ketiga (dark) saya membuat color tint dan shade dari satu warna magenta. Dengan kata lain, saya tidak menuruti desain (emang si paling rebel Teteh satu ini).

Di project nyata, apalagi jika berkaitan dengan warna brand, tentu ke-rebel-an ini tidak dapat dilakukan. Mengganti warna desain hanya "halal" dilakukan apabila contrast ratio warna tidak cukup sehingga buruk untuk web accessibility.

- **Warna tombol**

Ada tiga tema, masing-masing tema memiliki 3 warna tombol berbeda. Untuk mencapai itu dalam satu kali looping, mula-mula saya menggunakan ternary operation di elemen button seperti ini:

```javascript
className={ `flex cursor-pointer items-center justify-center rounded-xl p-6 leading-0 font-bold text-text-dark-blue drop-shadow-md md:p-8
${btn === "DEL" ? "button--blue bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 light:bg-teal-600 light:hover:bg-teal-500 dark:hover:bg-magenta-500" :
    btn === "RESET" ? "button--blue col-span-2 bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500" :
      btn === "=" ? "button--red col-span-2 bg-default-key-total hover:bg-default-key-total-hover text-[2rem] text-white dark:bg-amber-400 dark:hover:bg-amber-300 light:bg-orange-400 light:hover:bg-amber-500" :
        "button--light bg-default-key text-[2rem] dark:bg-magenta-700 dark:text-yellow-400 light:bg-stone-200 hover:bg-default-key-hover dark:hover:bg-magenta-600"
  }
`}
```

Pusing, enggak? Pusing lah. 😅

Maka, agar kode lebih mudah dipelihara dan meminimalkan kesalahan, metode tadi diubah menjadi object map untuk class.

Caranya, buat variabel untuk masing-masing `class`.

```javascript
// Basic styling yang berlaku untuk semua button
const baseClass = "flex cursor-pointer items-center justify-center rounded-xl p-6 leading-0 font-bold text-text-dark-blue drop-shadow-md md:p-8";

// Warna untuk button del, reset, dan =
const buttonClasses = {
"DEL": "button--blue bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500",
"RESET": "button--blue col-span-2 bg-default-key-reset text-xl text-white hover:bg-default-key-reset-hover dark:bg-magenta-600 dark:hover:bg-magenta-500 light:bg-teal-600 light:hover:bg-teal-500",
"=": "button--red col-span-2 bg-default-key-total text-[2rem] text-white hover:bg-default-key-total-hover dark:bg-amber-400 dark:hover:bg-amber-300 light:bg-orange-400 light:hover:bg-amber-500"
};

// Warna untuk buton number dan operasi matematika lainnya
const buttonNumber = "button--light bg-default-key text-[2rem] hover:bg-default-key-hover dark:bg-magenta-700 dark:text-yellow-400 dark:hover:bg-magenta-600 light:bg-stone-200"
```

Lalu mapping `class` tersebut di elemen button.

```javascript
<button            
className={`${baseClass} ${buttonClasses[btn] || buttonNumber}`}>
{btn}
</button>
```

Kita juga bisa menggunakan metode lain: pisahkan `classes` ke dalam variabel terpisah dan tetap menggunakan `if else` seperti biasa. Tapi saya tidak menggunakan metode ini karena conditional dan `if else` yang berundak-undak tetap lebih sulit dipelihara.

Oh ya, untuk membuat susunan tombol, cara paling baik adalah menggunakan `grid`. Buat 4 kolom sehingga masing-masing tombol akan mengisi satu kolom secara otomatis dan responsif terhadap viewport atau elemen pembungkusnya. Khusus untuk tombol "=" dan "reset", berikan `class` `col-span-2`.

```javascript
<div className="grid grid-cols-4 gap-4">
  
</div>
```

### 3. Theme Switcher

Untuk tombol theme switcher, saya menggunakan `input type=radio`, tapi kurang yakin apakah pendekatan ini valid secara semantik atau tidak.

### 4. React, Next.js, dan Tailwind v.4

Frontend Mentor tidak menentukan teknologi yang harus digunakan, kita bisa menggunakan native HTML, CSS, dan JavaScript seperti biasa, bisa juga menggunakan teknologi lain. Saya memutuskan untuk menggunakan Next.js yang notabene menggunakan React agar dapat memanfaatkan `components` yang membuat kode lebih modular. Selain itu, lebih mudah menangani JavaScript-nya.

*"Apakah overkill untuk project sekecil ini?"*

Saya kira tidak.

Mengenai React dan Next.js sendiri saya tidak menemui kesulitan berarti, barangkali karena sudah terbiasa menggunakannya. Sementara untuk Tailwind v.4, mula-mula sempat bingung tentang cara instal dan konfigurasi karena sama sekali berbeda dari versi sebelumnya. Tetapi karena dokumentasinya cukup jelas, semuanya lancar jaya. 

**Note:** jika kita langsung instal Tailwind saat membuat project Next.js, Next akan menggunakan Tailwind v.3 beserta konfigurasinya. Agar tidak perlu konfigurasi ulang, saya tidak menggunakan Tailwind saat pertama kali setup project. Tailwind diinstal kemudian.

---

Kesimpulannya, ini project yang cukup menyenangkan dan saya cukup puas dengan hasilnya. Selesai dalam waktu 2 hari. Berguna untuk melatih logika sekaligus latihan membuat web application yang lebih kompleks di kemudian hari. **(eL)**