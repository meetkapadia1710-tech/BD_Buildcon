const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const targetDir = path.join(__dirname, 'public')
const extensions = ['.jpg', '.jpeg', '.png', '.gif']

async function processDirectory(directory) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await processDirectory(fullPath)
    } else {
      const ext = path.extname(file).toLowerCase()
      if (extensions.includes(ext)) {
        const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp')

        try {
          console.log(`Converting: ${fullPath} -> ${webpPath}`)
          await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath)

          // Delete original file
          fs.unlinkSync(fullPath)
          console.log(`Deleted original: ${fullPath}`)
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error)
        }
      }
    }
  }
}

processDirectory(targetDir).then(() => {
  console.log('Conversion complete.')
})
