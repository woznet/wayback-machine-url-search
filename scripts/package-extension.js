import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../dist');
const zipPath = path.join(outputDir, 'wayback-machine-url-search.zip');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('error', (err) => {
  console.error('Archiver error:', err);
  process.exit(1);
});

output.on('close', () => {
  console.log(`✓ Extension packaged: ${zipPath} (${archive.pointer()} bytes)`);
});

archive.pipe(output);
archive.directory('src/', false);
archive.finalize();
