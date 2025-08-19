# Čitamo sadržaj fajla
$content = Get-Content 'index.html' -Raw

# Zamenimo sve dugačke SVG kodove sa jednostavnim img tagovima
$replacements = @{
    'Vue.js' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
    'JavaScript' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    'TypeScript' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    'CSS3' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    'HTML5' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    'Node.js' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    'Python' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    'PostgreSQL' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    'MongoDB' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    'Git' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    'VS Code' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
    'Figma' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    'AWS' = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg'
}

# Za svaku tehnologiju, zamenimo SVG sa img tagom
foreach ($tech in $replacements.Keys) {
    $imgTag = "<img src=`"$($replacements[$tech])`" alt=`"$tech`" />"
    # Zamenimo bilo koji SVG kod koji dolazi pre skill-name za tu tehnologiju
    $content = $content -replace "(?s)<svg[^>]*>.*?</svg>(?=\s*</div>\s*<span class=`"skill-name`">$([regex]::Escape($tech))</span>)", $imgTag
}

# Sačuvamo fajl
Set-Content 'index.html' $content
Write-Host "Svi SVG logovi su uspešno zamenjeni sa img tagovima!"
