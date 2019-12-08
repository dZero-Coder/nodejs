/*
    3-5-2. path
    - 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
    - 운영체제별로 경로 구분자가 다르기 때문에 필요
    Windows : "\"로 구분
    POSIX : "/"로 구분
*/

const path = require('path');
const string = __filename;

console.log('path.sep : ', path.sep);                               // 경로 구분자 (Widnows : '\', POSIX : '/')
console.log('path.delimiter : ', path.delimiter);                   // 환경 변수의 구분자 (Widnows : ';', POSIX : ':')

console.log('-----------------------------------------');
console.log('path.dirname() : ', path.dirname(string));             // 파일이 위치한 폴더 경로
console.log('path.extname() : ', path.extname(string));             // 파일의 확장자
console.log('path.basename() : ', path.basename(string));           // 파일의 이름을 보여줌 (확장자 포함)
console.log('path.basename() : ',                                   // 파일의 이름을 보여줌 (확장자 제외)
        path.basename(string, path.extname(string))); 

console.log('-----------------------------------------');
console.log('path.parse() : ', path.parse(string));                 // 파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format() : ', path.format({                       // path.parse()한 객체를 파일경로로 합침
    dir: 'C:\\users\\zerocho',
    name: 'path',
    ext: '.js'
}));
console.log('path.normalize() : ',                                  // '/'나 '\'를 실수로 여러번 사용했거나 혼용했을 때 정상적인 경로로 변환
        path.normalize('C:\\users\\\\zerocho\\\path.js'));

console.log('-----------------------------------------');
console.log('path.isAbsolute() : ', path.isAbsolute('C:\\'));       // 파일의 경로가 절대경로(True)인지 상대경로(False)인지 판별
console.log('path.isAbsolute() : ', path.isAbsolute('./home'));

console.log('-----------------------------------------');
console.log('path.relative() : ', path.relative('C:\\users\\zerocho\\path.js', 'C:\\'));        // 첫번째 경로에서 두번째 경로로 가는 방법
console.log('path.join() : ', path.join(__dirname, '...', '..', '/users', '.', '/zerocho'));    // 여러 인자를 하나로 합쳐줌
console.log('path.resolve() : ', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));      // 여러 인자를 하나로 합쳐줌

/*
    join과 resolve의 차이
    - path.resolve : '/'를 만나면 절대 경로로 인식하여 앞의 경로를 무시
    - path.join : '/'를 만나면 상대 경로로 처리

    path.join('/a', '/b', 'c');    // 결과 : /a/b/c/
    path.join('/a', '/b', 'c');    // 결과 : /b/c
*/