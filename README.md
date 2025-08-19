# VelByte Portfolio - Dodavanje Projekata

## 📁 Trenutni projekti

### 1. Preko Puta - Fast Food Restaurant
- **Lokacija**: `projects/prekoputa-website/`
- **Tehnologije**: HTML5, CSS3, Bootstrap, JavaScript
- **Tip**: Websajt za fast food restoran
- **Fajlovi**: index.html, contact.html, menu.html

### 2. Auto Plac Mirko
- **Lokacija**: `projects/auto-mirko/`
- **Tehnologije**: HTML5, CSS3, JavaScript, Firebase
- **Tip**: Profesionalna trgovina vozilima
- **Fajlovi**: index.html, katalog.html, kontakt.html, radio.html, admin panel

### 3. Modern Web App (Demo)
- **Lokacija**: `projects/modern-web-app/`
- **Tehnologije**: React, Redux, Node.js
- **Tip**: Demo projekat

## Kako dodati novi projekat

### 1. Kreiranje foldera
Napravite novi folder u `projects/` direktorijumu:
```
projects/
├── modern-web-app/
├── novi-projekat/          ← Ovde
└── ...
```

### 2. Dodavanje fajlova projekta
U folder `novi-projekat/` stavite sve fajlove vašeg projekta:
```
novi-projekat/
├── index.html
├── style.css
├── script.js
├── images/
└── ...
```

### 3. Ažuriranje portfolio sekcije
U `index.html` fajlu, pronađite portfolio sekciju i dodajte novi portfolio-item:

```html
<div class="portfolio-item" data-category="web">
    <div class="portfolio-image">
        <div class="portfolio-overlay">
            <div class="portfolio-info">
                <h3>Naziv Projekta</h3>
                <p>Opis projekta</p>
                <div class="portfolio-tech">
                    <span class="tech-tag">HTML</span>
                    <span class="tech-tag">CSS</span>
                    <span class="tech-tag">JavaScript</span>
                </div>
                <div class="portfolio-links">
                    <a href="projects/novi-projekat/index.html" class="portfolio-link" target="_blank" title="Otvori projekat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                    <a href="#" class="portfolio-link" title="GitHub (uskoro)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="placeholder-img">
            <!-- Dodajte preview sliku ili kod snippet -->
        </div>
    </div>
</div>
```

### 4. Kategorije projekata
Dostupne kategorije za `data-category`:
- `web` - Web aplikacije
- `ecommerce` - E-commerce projekti  
- `dashboard` - Dashboard aplikacije

### 5. Dodavanje "Nazad" linka
U vašem projektu dodajte link za povratak:
```html
<a href="../../index.html#portfolio" class="back-btn">
    ← Nazad na Portfolio
</a>
```

## Email funkcionalnost

Kontakt forma automatski šalje emailove na `velbyters@gmail.com`.

### Potrebne stvari za email:
1. Web server sa PHP podrškom
2. PHP mail() funkcija konfigurirana
3. Ili koristite servise poput EmailJS za klijentsko slanje

## Testiranje lokalno

1. Otvorite `index.html` u browser-u
2. Kliknite na portfolio linkove
3. Projekti će se otvoriti u novom tab-u

## Hosting

Za live hosting preporučujem:
- Netlify (besplatno)
- Vercel (besplatno) 
- GitHub Pages (besplatno)
- Ili bilo koji shared hosting sa PHP podrškom za email funkcionalnost
