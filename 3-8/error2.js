/*
    3-8-2. 없는 파일 지우기 예외처리
*/
const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if(err){
            console.log(err);
        }
    });
}, 1000);