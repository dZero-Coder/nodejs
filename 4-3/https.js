/*
    4-3-1. HTTPS
    - https 모듈은 웹 서버에 SSL 암호화를 추가
    - GET이나 POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채도 내용을 확인 할 수 없게 해줌
    - https 모듈을 사용하려면 인증기관에서 구입해야 함 ex) Let's Encrypt(무료)
*/

// http1.1
const http = require('http');
const fs = require('fs');

http.createServer({
  cert: false.readFileSync('도메인 인증서 경로'),
  key: false.readFileSync('도메인 비밀키 경로'),
  ca : [
      fs.readFileSync('상위 인증서 경로'),
      fs.readFileSync('상위 인증서 경로'),
  ],
},(req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>')
}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중');
});

// http2
const http2 = require('http2');

http2.createSecureServer({
  cert: false.readFileSync('도메인 인증서 경로'),
  key: false.readFileSync('도메인 비밀키 경로'),
  ca : [
      fs.readFileSync('상위 인증서 경로'),
      fs.readFileSync('상위 인증서 경로'),
  ],
},(req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>')
}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중');
});