# 🚀 Zamonaviy Dasturchi Portfoliosi (Portfolio Website)

Ushbu portfolio veb-sayti zamonaviy **HTML5, CSS3 va toza JavaScript (ES6+)** asosida to'liq noldan yaratilgan bo'lib, har qanday qurilma (telefon, planshet, kompyuter) uchun moslashuvchan va yuqori tezlikda ishlaydi.

---

## 🌟 Asosiy Imkoniyatlar

- **🎨 Zamonaviy UI/UX Dizayn:** Glassmorphism, yumshoq gradientlar va zamonaviy neon porlash effektlari.
- **🌓 Qorong'i va Yorug' (Dark / Light) rejim:** Tanlangan mavzu foydalanuvchi brauzerida (`localStorage`) saqlanadi.
- **⌨️ Dinamik Matn Animatsiyasi:** Bosh sahifada (Hero) dasturchi sohalari avtomatik yozilib turadi (Typing effect).
- **📊 Interaktiv Hisoblagichlar:** Sahifa skroll qilinganda tajriba yillari va loyihalar soni 0 dan ko'tarilib boradi.
- **📂 Loyihalarni Filtrlash:** Barchasi, Frontend, Veb Ilovalar, E-Commerce va UI/UX toifalari bo'yicha saralash.
- **🔍 Loyiha Tafsilotlari Modali (Popup):** "Batafsil" tugmasi bosilganda chiroyli oynada qo'shimcha ma'lumotlar ko'rsatiladi.
- **📱 Mobil Menyu (Hamburger menu):** Smartfonlarda qulay va chiroyli ochiluvchi navigatsiya.
- **✉️ Aloqa Formasi va Xabarnoma (Toast):** Ma'lumotlar to'g'ri kiritilganini tekshiradi va chiroyli xabarnoma chiqaradi.

---

## 📁 Loyiha Fayllari Tuzilishi

```
portfolio/
├── index.html       # Barcha bo'limlar bilan to'liq semantik HTML sahifa
├── style.css        # Barcha ranglar, dizaynlar, animatsiyalar va responsivlik
├── script.js        # Barcha interaktiv funksiyalar va dinamik xatti-harakatlar
└── README.md        # Ushbu qo'llanma fayli
```

---

## 💻 Loyihani Qanday Ochish va Ishlatish Mumkin?

### 1-usul: Oddiy usul (Faylni to'g'ridan-to'g'ri ochish)
`portfolio` papkasiga kiring va `index.html` faylini istalgan brauzerda (Google Chrome, Microsoft Edge, Firefox va h.k.) ikki marta bosib oching.

### 2-usul: Python lokal serveri orqali (Tavsiya etiladi)
Terminal yoki PowerShell-da quyidagi buyruqni ishga tushiring:

```powershell
cd C:\Users\intel\.gemini\antigravity\scratch\portfolio
python -m http.server 8000
```
Keyin brauzeringizda ushbu manzilni oching:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## ✏️ O'zingizga Moslashtirish (Customization)

1. **Ism va Kasb:**
   - `index.html` faylini oching va `Azizbek Rahimov` o'rniga o'z ism-familiyangizni yozing.
   - `script.js` ichidagi `roles` massivida o'zingizning mutaxassisliklaringizni o'zgartirishingiz mumkin:
     ```javascript
     const roles = [
       'Frontend Dasturchiman',
       'React Mutaxassisiman',
       ...
     ];
     ```

2. **Aloqa ma'lumotlari:**
   - `index.html` ichidagi `#contact` bo'limida o'zingizning Telegram, Email va telefon raqamlaringizni kiriting.

3. **Loyihalar:**
   - `index.html` ichidagi loyihalar nomini, teglari va tavsiflarini o'zgartiring.
   - `script.js` ichidagi `projectDetails` obyektida loyihalaringiz havolalari (Live Demo, GitHub) va xususiyatlarini kiriting.
