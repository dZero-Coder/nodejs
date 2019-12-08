/*
    3-6-6. zlib
    - 파일을 압축하는 모듈
 */
const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);