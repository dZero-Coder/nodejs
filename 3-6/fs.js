/*
    3-6-1. fs
    - 파일 시스템에 접근하는 모듈
    - 파일 생성 및 삭제, 읽고 쓰기 가능
*/

const fs = require('fs');
const path = require('path');

/*
    fs.readFile : 파일을 읽어서 버퍼 형식으로 결과를 제공
*/
console.log('test')

fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data);              // 버퍼 형식
    console.log(data.toString());   // 문자열 형식
});

fs.writeFile('.writeme.txt', '글이 입력됩니다.', (err) => {
    if(err){
        throw err;
    }
    fs.readFile('.writeme.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log(data.toString());
    })
})