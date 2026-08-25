const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Helper to copy folder recursively
function copyFolderSync(from, to) {
    if (!fs.existsSync(from)) return;
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const stat = fs.lstatSync(path.join(from, element));
        if (stat.isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else if (stat.isDirectory()) {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

console.log('Starting mobile asset bundle build...');

// 1. Clean www directory
if (fs.existsSync(destDir)) {
    console.log('Cleaning old build directory...');
    fs.rmSync(destDir, { recursive: true, force: true });
}

// 2. Create www directory
fs.mkdirSync(destDir);

// 3. Copy files and folders
const filesToCopy = ['index.html', 'robots.txt', 'sitemap.xml'];
filesToCopy.forEach(file => {
    const srcFile = path.join(srcDir, file);
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, path.join(destDir, file));
        console.log(`Copied ${file}`);
    }
});

if (fs.existsSync(path.join(srcDir, 'assets'))) {
    copyFolderSync(path.join(srcDir, 'assets'), path.join(destDir, 'assets'));
    console.log('Copied assets folder recursively');
}

console.log('Build completed successfully! Web assets are in the "www" folder.');
