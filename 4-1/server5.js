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

const session = {};

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // 주소가 login으로 시작하는 경우
    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        // 임의의 숫자 설정
        const randomInt = new Date();
        session[randomInt] = {      // 세션에 해당 내용을 담음
            name,
            expires,
        };
        // response에 리다이렉트시키는 코드를 헤더에 넣어 보냄
        res.writeHead(302, {
            Location: '/',  // 리다이렉트 주소 : /
            // 쿠키생성 : 이름과 만료일 → 세션으로 임의의 숫자를 넘김
            'Set-Cookie':`session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    // session이 존재하며, session의 expires가 만료기한을 넘기 않은 경우 인사말 출력
    }else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요.`);
    }else{
        fs.readFile('./server4.html', (err, data) => {
            if(err){
                throw err;
            }
            res.end(data)
        });
    }
})
    .listen(9094, () => {
        console.log('9094번 포트에서 서버 대기중');
    });

/*
    세션
    - 서버에 사용자 정보를 저장하고 크라라이언트와는 세션 아이디로만 소통
    - 실제 배포용 서버에서는 세션을 변수보다는 DB에 저장함
*/