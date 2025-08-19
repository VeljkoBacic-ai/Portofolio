# 🚀 GitHub Pages Setup za Veljko Baćić Portfolio

## ❌ Problem sa GitHub Pages
**GitHub Pages je statički hosting** - NE podržava PHP!
- `send_email.php` NEĆE raditi
- Trebaš alternativa za email funkcionalnost

## ✅ Rešenje 1: EmailJS (PREPORUČENO)

### Korak 1: Registracija na EmailJS
1. Idi na [emailjs.com](https://emailjs.com)
2. Napravi besplatan nalog
3. Verifikuj email

### Korak 2: Podešavanje Email Servisa
1. U EmailJS dashboard-u klikni **"Email Services"**
2. Dodaj **Gmail service**
3. Konektuj svoj Gmail (`velbyters@gmail.com`)

### Korak 3: Kreiranje Email Template
1. Idi na **"Email Templates"**
2. Klikni **"Create New Template"**
3. Koristi ovaj template:

```
Subject: Nova poruka sa portfolio sajta

Od: {{from_name}}
Email: {{from_email}}

Poruka:
{{message}}
```

4. Sačuvaj template i zapamti **Template ID**

### Korak 4: Preuzmi ključeve
- **Public Key** (iz Account sekcije)
- **Service ID** (iz Email Services)
- **Template ID** (iz Email Templates)

### Korak 5: Uredi index.html
Zameni u `index.html` (linija ~857):

```javascript
<script>
    // Initialize EmailJS
    emailjs.init("TVOJ_PUBLIC_KEY"); // Upiši svoj public key
    window.emailjsConfigured = true;
</script>
```

I u `script.js`, zameni:
- `YOUR_SERVICE_ID` sa tvojim Service ID
- `YOUR_TEMPLATE_ID` sa tvojim Template ID

## ✅ Rešenje 2: Formspree (Alternativa)

1. Idi na [formspree.io](https://formspree.io)
2. Registruj se
3. Kreiraj form za `velbyters@gmail.com`
4. Dobićeš endpoint URL
5. Zameni `action` u contact formi

## 🚀 Deploy na GitHub Pages

### Opcija A: Preko GitHub Web Interfejsa
1. Napravi novi repository
2. Upload svih fajlova (OSIM `send_email.php`)
3. Idi u Settings > Pages
4. Izaberi Source: "Deploy from branch"
5. Izaberi "main" branch
6. Sajt će biti na: `https://username.github.io/repository-name`

### Opcija B: Git Commands
```bash
git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

## 📁 Fajlovi za GitHub Pages
Upload ove fajlove:
- ✅ `index.html`
- ✅ `styles.css` 
- ✅ `script.js`
- ✅ `image1_large.jpg`
- ✅ `projects/` folder
- ❌ `send_email.php` (neće raditi)

## 🔧 Test Before Deploy
1. Konfiguriši EmailJS
2. Testiraj lokalno
3. Kad radi, upload na GitHub

## 📧 Email Opcije Summary

| Hosting | PHP Email | EmailJS | Formspree |
|---------|-----------|---------|-----------|
| **Localhost** | ❌ | ✅ | ✅ |
| **GitHub Pages** | ❌ | ✅ | ✅ |
| **PHP Hosting** | ✅ | ✅ | ✅ |

## 💡 Preporuka
**Za GitHub Pages koristi EmailJS** - besplatan je za 200 emailova mesečno, što je dovoljno za portfolio sajt.
