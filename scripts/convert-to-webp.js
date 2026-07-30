const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const targetDir = path.join(__dirname, '..', 'public')
const extensions = ['.jpg', '.jpeg', '.png', '.gif']

// Files that MUST stay in their original format — converting these to .webp and
// deleting the source (as this script does below) silently breaks them:
//   • favicon / PWA manifest icons and apple-touch-icon are referenced as .png by
//     app/layout.tsx and app/manifest.ts, and iOS ignores webp for touch icons.
// These are produced by `npm run icons:generate`; this script used to eat them,
// which is how they went missing. Keep the two scripts from fighting.
const EXCLUDED_PATHS = [
  path.join(targetDir, 'icons'),
  path.join(targetDir, 'apple-touch-icon.png'),
  path.join(targetDir, 'favicon.ico'),
]

function isExcluded(fullPath) {
  return EXCLUDED_PATHS.some((ex) => fullPath === ex || fullPath.startsWith(ex + path.sep))
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)

    if (isExcluded(fullPath)) {
      console.log(`Skipping (protected): ${fullPath}`)
      continue
    }

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
