var express = require('express');
var router = express.Router();      // Router 객체 생성

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });    // 클라이언트에 응답을 보냄
  /*
    res.send(버퍼 or 문자열 or HTML or JSON);
    res.sendFile(파일 경로);
    res.json(JSON 데이터);
    res.redirect(주소);
    res.render('템플릿 파일 경로', {변수});

    res.status(상태코드).send();
  */
});

/* 유용한 패턴 */
// /user/:id → /user/1 혹은 /user/123 등
router.get('/user/:id', function(req, res){
  console.log(req.params, req.query);
  //req.params.id에 1이나 123 등이 들어가 있음
});

// use, get, post, put, patch, delete 존재

module.exports = router;            // Router 모듈 생성
