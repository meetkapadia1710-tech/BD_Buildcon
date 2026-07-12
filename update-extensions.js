const fs = require('fs')
const path = require('path')

const targetDirs = [path.join(__dirname, 'app'), path.join(__dirname, 'components'), path.join(__dirname, 'content')]

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      const original = content

      // Look for paths matching /brochurephotos/... ending in .jpg, .jpeg, or .png
      // using regex replacement
      content = content.replace(/\/brochurephotos\/([^"']+)\.(jpg|jpeg|png)/gi, '/brochurephotos/$1.webp')

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log(`Updated references in: ${fullPath}`)
      }
    }
  }
}

targetDirs.forEach((dir) => processDirectory(dir))
console.log('Reference update complete.')
