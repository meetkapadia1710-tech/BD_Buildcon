const fs = require('fs')
const path = require('path')

const foldersDir = path.join(__dirname, 'public', 'brochurephotos', 'site photos')
const folders = fs.readdirSync(foldersDir).filter((f) => {
  return fs.statSync(path.join(foldersDir, f)).isDirectory() && f !== 'technical photos'
})

const folderImages = {}
folders.forEach((folder) => {
  const files = fs
    .readdirSync(path.join(foldersDir, folder))
    .filter((f) => f.endsWith('.webp'))
    .map((f) => `/brochurephotos/site photos/${folder}/${f}`)
  folderImages[folder] = files
})

console.log(JSON.stringify(folderImages, null, 2))
