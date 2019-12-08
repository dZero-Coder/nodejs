/*
    3-5-4. crypto
    - 다양한 방식의 암호화를 도와주는 모듈
*/

/*
    1. 단방향 암호화
    - 복호화 불가능한 암호화 방식 ex) Hash
    - Hash : 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식
    (입력 문자열의 길이가 달라도, 출력 문자열의 길이는 고정)

    createHash(알고리즘) : 사용할 해시 알고리즘 (md5, sha1, sha256, sha512 등)
    update(문자열) : 변환할 문자열
    digest(문자열) : 인코딩할 알고리즘 (base64, hex, latin1 등)
*/
const crypto = require('crypto');

console.log('base64 : ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('base64 : ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
console.log('hex : ', crypto.createHash('sha512').update('비밀번호').digest('hex'));

console.log('--------------------------------------------------------------------------')
/*
    pbkdf2 : salt라는 임의의 문자열을 기존의 문자열에 붙인 후 해시 알고리즘을 반복해서 적용 (비밀번호 암호화)
*/

crypto.randomBytes(64, (err, buf) => {      // 64Byte 길이의 문자열을 만듬 → salt
    const salt = buf.toString('base64');
    console.log('salt : ', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {       // 비밀번호, salt, 반복횟수, 출력 바이트, 해시 알고리즘
        console.log('password : ', key.toString('base64'));
    });
});

console.log('--------------------------------------------------------------------------')
/*
2. 양방향 암호화
    - 키를 이용하여 암호화 및 복호화를 수행하는 암호방식

    crypto.createCipher(알고리즘, 키) : 암호화 알고리즘과 키를 넣어 객체 생성
        
    
    cipher.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩, 출력 결과물이 인코딩을 넣어줌
*/
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');     // 암호화 알고리즘(aes-256-cbc)와 키(열쇠)를 넣음
let result = cipher.update('암호화할 문장', 'utf8', 'base64');  // 암호화할 대상과 대상의 인코딩(utf8), 출력 결과물(base64)를 넣음
result += cipher.final('base64');                              // 출력 결과물의 인코딩을 넣어주면 암호화 완료
console.log('암호화 : ', result)

/*
    crypto.getCiphers() : 사용 가능한 알고리즘 목록을 반환하는 함수
    final을 주지않으면 final block이 빠져있기 때문에 복호화를 할 수 없음
*/

const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');  // 암호화 할때 사용한 알고리즘과 키를 넣음
let result2 = decipher.update(result, 'base64', 'utf8');        // 복호화할 대상과 암호화할 때 대상의 인코딩과 출력 결과물을 반대로 넣음
result2 += decipher.final('utf8');                              // 복호화 결과물의 인코딩을 넣어줌
console.log('복호화 : ', result2)