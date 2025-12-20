import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('CWD:', process.cwd());
console.log('__dirname of index.js:', __dirname);
console.log('Uploads path being used:', path.join(__dirname, 'uploads'));
