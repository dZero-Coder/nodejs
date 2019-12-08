/*
    쿠키(Cookie)
    - 키와 값의 쌍으로 서벙 요청에 대한 응답에 같이 보냄
    - 클라이언트에 요청자를 추정할 만한 정보를 쿠키로 만들어 보내고, 그 다음부터는 클라이언트로부터 쿠키를 받아 요청자 파악
*/
const http = require('http');

/*
    쿠키는 name=hong;age=23 같은 형식으로 전달되므로
    이를 {name:'hong', age:'23'} 형식으로 변경
*/
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie); // req.header.cookie에 쿠키가 담겨 있음
    console.log(req.url, cookies);  // req.url : 요청 헤더
    /*
        res.writeHead(상태코드, 헤더 내용) : 응답의 헤더에 쿠키를 기록
            Set-Cookie : 쿠키를 저장
    */
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('Hello Cookie')
})
    .listen(9092, () => {
        console.log('9092번 포트에서 서버 대기 중')
    });


/*
    HTTP 상태코드
    - 200 : 성공을 알리는 상태 코드
        ex) 200(성공), 201(작성됨)
    - 300 : 리다이렉션(다른 페이지 이동)을 알리는 상태 코드
        ex) 301(영구이동), 302(임시이동)
    - 400 : 요청 오류(요청 자체의 오류)
        ex) 401(권한없음), 403(금지됨), 404(찾을 수 없음)
    - 500 : 서버 오류
        ex) 500(내부서버오류), 502(불량 게이트웨이), 503(서비스 이용불가)ㄴ
*/ 

