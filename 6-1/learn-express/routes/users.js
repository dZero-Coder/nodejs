var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
  - /user/flash 라우터로 GET 요청을 보내면 서버에서는 세션과 flash에 메시지를 설정
  - /user/flash/result 메시지로 redirect

  - session 메시지는 게속 보이지만, flash 메시지는 일회성(로그인, 회원가입 에러 및 경고 메시지에 적합)
*/
router.get('/flash', function(req, res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req, res){
  res.send(`${req.session.message} ${req.flash('message')}`);
});

module.exports = router;
