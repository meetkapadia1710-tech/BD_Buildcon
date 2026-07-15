const fs = require('fs')
const path = require('path')

function checkExactCase(filepath) {
  const parts = filepath.split(path.sep)
  let currentPath = parts[0] || '\\'

  // if absolute
  if (path.isAbsolute(filepath)) {
    // for windows C:\ it's handled roughly, let's just do relative
  }
}

function getActualCase(dir, filename) {
  try {
    const files = fs.readdirSync(dir)
    for (const f of files) {
      if (f.toLowerCase() === filename.toLowerCase()) {
        return f
      }
    }
  } catch (e) {
    return null
  }
  return null
}

function check(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== '.git' && file !== '.next') {
      check(fullPath)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const importRegex = /from\s+['"]([^'"]+)['"]/g
      let match
      while ((match = importRegex.exec(content)) !== null) {
        let req = match[1]
        if (req.startsWith('.') || req.startsWith('@/')) {
          let targetPath = ''
          if (req.startsWith('@/')) {
            targetPath = path.join(process.cwd(), req.replace('@/', ''))
          } else {
            targetPath = path.join(path.dirname(fullPath), req)
          }

          // attempt to resolve .tsx, .ts, /index.tsx etc
          const exts = ['.tsx', '.ts', '/index.tsx', '/index.ts', '']
          let found = false
          let matchedExt = ''
          for (const ext of exts) {
            if (fs.existsSync(targetPath + ext)) {
              found = true
              matchedExt = ext
              break
            }
          }
          if (found) {
            const finalPath = targetPath + matchedExt
            const dirname = path.dirname(finalPath)
            const basename = path.basename(finalPath)
            const actual = getActualCase(dirname, basename)
            if (actual && actual !== basename) {
              console.error(`Case mismatch in ${fullPath}: imports '${req}', actual file is '${actual}'`)
            }

            // Also check parent directories if needed, but usually the basename is the issue
            const parentBase = path.basename(dirname)
            const grandParent = path.dirname(dirname)
            const actualParent = getActualCase(grandParent, parentBase)
            if (actualParent && actualParent !== parentBase) {
              console.error(
                `Case mismatch in directory for ${fullPath}: imports '${req}', actual dir is '${actualParent}'`,
              )
            }
          } else {
            console.error(`Unresolved import in ${fullPath}: ${req}`)
          }
        }
      }
    }
  }
}

check('.')
