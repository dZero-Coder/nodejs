const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

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
    const cookies = parseCookies(req.headers.cookie);
    // 주소가 login으로 시작하는 경우
    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        // response에 리다이렉트시키는 코드를 헤더에 넣어 보냄
        res.writeHead(302, {
            Location: '/',  // 리다이렉트 주소 : /
            // 쿠키생성 : 이름과 만료일
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; path=/`,
        });
        res.end();
    // 그외('/'로 접속한 경우) 중에 cookies.name이 존재하는 경우 인사말 출력
    }else if(cookies.name){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요.`);
    // 그외('/'로 접속한 경우) 중에 cookies.name이 존재하지 않은 경우 server4.html를 출력
    }else{
        fs.readFile('./server4.html', (err, data) => {
            if(err){
                throw err;
            }
            res.end(data)
        });
    }
})
    .listen(9093, () => {
        console.log('9093번 포트에서 서버 대기중');
    });

/*
    쿠키 설정 옵션
    - 쿠키명=쿠키값 : 기본적인 쿠키의 값 ex) name=hong의 키와 값의 형태
    - Expires=날짜 : 만료기한으로 이 기간이 지나면 쿠키는 삭제됨 (default : 클라이언트 종료)
    - Max-age=초 : 해당 초가 지나면 쿠키가 제거 (Expires보다 우선순위가 높음)
    - Domain=도메인명 : 쿠키가 전송될 도메인을 특정할 수 있음 (default : 현재 도메인)
    - path=URL : 쿠키가 전송될 URL을 특정할 수 있음 (default : '/' - 모든 URL에서 쿠키 전송가능)
    - Secure : HTTPS인 경우에만 쿠키가 전송
    - HttpOnly : 설정 시 js에서 쿠키에 접근할 수 없음 (쿠키 조작 방지를 위해 설정 권장)
*/