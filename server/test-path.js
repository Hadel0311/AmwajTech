import path from 'path';

console.log('Result of path.join:');
console.log(path.join(process.cwd(), 'server', '/uploads/123.pdf'));
console.log(path.join(process.cwd(), 'server', 'uploads/123.pdf'));
