const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    // fs 모듈로 html 파일을 읽어서 data변수에 저장된 버퍼를 그대로 클라이언트에 보냄
    fs.readFile('./server2.html', (err, data) => {
        if(err){
            throw err;
        }
        res.end(data);
    });
}).listen(9091, () => {
    console.log('9091번 포트로 서버 대기 중');
});