const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'content', 'projects.ts')
let content = fs.readFileSync(filePath, 'utf8')

const updates = {
  'tagros-chemicals': '/brochurephotos/site photos/tagros/TAGROS (1).webp',
  'birla-cellulose': '/brochurephotos/site photos/birla/BIRLA CELLULOSIC 3 (2).webp',
  'dic-fine-chemicals': '/brochurephotos/site photos/dic fine chem/DSC_2480.webp',
  'navin-fluorine': '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205518.webp',
  'roxul-rockwool': '/brochurephotos/site photos/ROXUL ROCKWOOL/DSC_8467.webp',
  hscl: '/brochurephotos/site photos/hscl/IMG-20190814-WA0039.webp',
  'zcl-chemicals': '/brochurephotos/site photos/zcl/KBM_4823 - Copy.webp',
  'gfl-dahej': '/brochurephotos/site photos/gfl/Screenshot 2026-07-03 205836.webp',
  'gacl-plant': '/brochurephotos/site photos/gacl ppa/WhatsApp Image 2021-02-26 at 7.33.32 AM.webp',
}

// For each project slug, find the block and replace the image and images arrays
for (const [slug, imgPath] of Object.entries(updates)) {
  const regex = new RegExp(
    `(slug:\\s*'${slug}',[\\s\\S]*?image:\\s*')[^']+('[\\s\\S]*?images:\\s*\\[\\s*')[^]*?(\\s*\\])`,
    'm',
  )
  content = content.replace(regex, (match, p1, p2, p3) => {
    return `${p1}${imgPath}${p2}'${imgPath}'${p3}`
  })
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('projects.ts updated')
