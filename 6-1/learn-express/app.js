var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');     // 세션관련 미들웨어 추가
var flash = require('connect-flash');         // cookie와 session를 사용하므로 뒤에 배치

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// express 패키지를 호출하여 app 변수 객체를 생성 (각종 기능 연결)
var app = express();

// app.set()으로 express app를 설정할 수 있음
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.set('view engine', 'ejs');      // npm i ejs

//미들웨어를 연결(morgan 미들웨어)
app.use(logger('dev'));   // 개발 : dev, short, 배포 : common, combined

// 이 순서대로 미들웨어를 처리하며, next() 메서드를 거처서 다음으로 넘김
// 그러므로 정적인 파일을 처리하는 static 부분을 윗부분으로 올려 주는 것이 좋음
/*
  static
  - 정적인 파일들을 제공
  - 실제 서버의 폴더 경로에는 public이 들어 있지만, 요청 주소에는 public이 들어 있지 않음 (보안)
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
  body-parser
  - 요청의 본문을 해석해주는 미들웨어
  - form 데이터나 ajax 요청의 데이터를 처리
  - express 4.16.0 부터는 일부 기능이 익스프레스에 내장
    bodyParser.json() → express.json(), bodyParser.urlencoded() → express.urlencoded()
*/
app.use(express.json());
/*
  bodyParser.urlencoded
  - extended : false → 노드의 querystring 모듈을 사용하여 쿼리스트링 해석
  - extended : true  → qs 모듈을 사용하여 쿼리스트링을 해석
*/
app.use(express.urlencoded({ extended: false }));

/*
  cokie-parser
  - 요청에 동봉된 쿠키를 해석
*/
app.use(cookieParser('secret code'));

/*
  express-session
  - 세션 관리용 미들웨어 (로그인 등의 이유로 세션을 구현할 때 매우 유용)
  - npm i express-session으로 설치후 사용
*/
app.use(session({
  resave: false,              // 요청이 온 경우 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 여부
  saveUninitialized: false,   // 세션에 저장할 내역이 없더라도 세션을 저장할지 여부
  secret: 'secret code',      // cookie-parser의 비밀키와 같은 역할 (cookie-parser와 같은 값이여야 함)
  cookie: {                   // 세션 쿠키에 대한 설정
    httpOnly: true,
    secure: false,
    /* maxAge, domain, path, expires, sameSite, httpOnly, secure 등 옵션이 제공 */
  },
}));

/*
  connect-flash
  - 일회성 메시지들을 웹 브라우저에 나타낼 때 좋은 미들웨어
  - req 객체에 req.flash()를 추가
  - req.flash(키, 값) : 해당 키에 값을 설정
  - req.flash(키) : 해당 키에 대한 값을 불러옴
*/
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 에러 처리 미들웨어
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app 객체를 모듈로 생성
module.exports = app;