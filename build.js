const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const partialsDir = path.join(rootDir, 'partials');

const header = fs.readFileSync(path.join(partialsDir, 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(partialsDir, 'footer.html'), 'utf8');

function processDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      processDir(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content.replace('<!-- include:header -->', header);
      content = content.replace('<!-- include:footer -->', footer);
      fs.writeFileSync(destPath, content);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

processDir(srcDir, rootDir);
