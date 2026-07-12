const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'content', 'projects.ts')
let content = fs.readFileSync(filePath, 'utf8')

// Fix double quotes issue ''/path' -> '/path'
content = content.replace(/''\/brochurephotos/g, "'/brochurephotos")

fs.writeFileSync(filePath, content, 'utf8')
console.log('projects.ts quotes fixed')
