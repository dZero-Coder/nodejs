const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((req, res) => {
    // GET 방식인 경우
    if(req.method === 'GET'){
        // url이 '/'와 '/about'인 경우 HTML 파일을 읽어서 전송 (페이지 요청의 응답)
        if(req.url === '/'){
            return fs.readFile('./restFront.html', (err, data) => {
                if(err){
                    return err;
                }
                res.end(data);
            });
        }else if(req.url === '/about'){
            return fs.readFile('./about.html', (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });

        // url이 '/users'인 경우 user 데이터 전송
        }else if(req.url === '/users'){
            return res.end(JSON.stringify(users));  // JSON 형식으로 변환하여 전송
        }

        return fs.readFile(`.${req.url}`, (err, data) => {
            if(err){
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND')
            }
            return res.end(data);
        });
    // POST 방식인 경우
    }else if( req.method === 'POST'){
        if(req.url === '/users'){
            let body = '';
            // req는 ReadableStream 이므로 요청과 같이 들어오는 이벤트 처리
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('POST 본문(Body) : ', body);
                const {name} = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('등록성공');
            });
        }
    }else if(req.method === 'PUT'){
        if(req.url.startsWith('/users/')){
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT 본문(Body) : ', body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        }
    }else if(req.method === 'DELETE'){
        if(req.url.startsWith('/users/')){
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
})
    .listen(9000, () => {
        console.log('9000번 포트에서 서버 대기 중')
    });