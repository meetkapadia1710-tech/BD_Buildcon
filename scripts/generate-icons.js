const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Simple square brand mark — three pillars on the dark brand background,
// matching the accent bars in app/opengraph-image.tsx. No text/fonts,
// so sharp/librsvg rasterizes it cleanly at any size.
const mark = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="#1F2124"/>
  <rect x="24" y="22" width="14" height="56" rx="7" fill="#16A8B8"/>
  <rect x="43" y="22" width="14" height="56" rx="7" fill="#FDB913"/>
  <rect x="62" y="22" width="14" height="56" rx="7" fill="#E32322"/>
</svg>`

const targets = [
  { out: 'public/icons/icon-192.png', size: 192 },
  { out: 'public/icons/icon-512.png', size: 512 },
  { out: 'public/apple-touch-icon.png', size: 180 },
]

async function run() {
  const svgBuffer = Buffer.from(mark)
  for (const t of targets) {
    const outPath = path.join(__dirname, '..', t.out)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    await sharp(svgBuffer).resize(t.size, t.size).png().toFile(outPath)
    console.log(`Generated ${t.out}`)
  }
}

run()
