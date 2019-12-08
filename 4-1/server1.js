/*
    4-1-1. 요청과 응답
    - 서버는 클라이언트가 있기에 동작함
    - 클라이언트에서 서버로 요청(request)를 보내고 서버가 요청을 읽고 처리한 뒤 클라이언트로 응답(response)를 보냄
    - 요청과 응답은 이벤트 방식으로 생각하면 편하며, 클라이언트로부터 요청이 왔을 때 수행할 작업을 미리 이벤트 리스너에 등록해야 함
*/
const http = require('http');

// createServer(request, response)
const server = http.createServer((req, res) => {
    // 응답 처리
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>')
});

server.listen(9090);    // 클라이언트에게 공개할 포트 번호와 포트 연결

/*
    http://127.0.0.1:9090 으로 접속
*/ 
