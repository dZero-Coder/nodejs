/*
    3-6-4. async (비동기) 순서
    - readFile()의 콜백함수에 다음 readFile()을 넣어줌
*/
const fs = require('fs');

console.log('시작');

fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
        });
    });
});

console.log('끝');