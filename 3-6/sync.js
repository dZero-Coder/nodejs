/*
    3-6-3. sync (동기)
    - readFile() -> readFileSync()
    - 콜백함수 대신 return 값을 받음
*/

const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
console.log('끝');