/*
    3-5-5. util
    - 각종 편의 기능을 모아둔 모듈로 API가 추가되기도하며, deprecated되어 사라지는 경우
    - deprecated : 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될
*/

const util = require('util');
const crypto = require('crypto');

/*
    util.deprecate : 함수가 deprecated 처리되었음을 알려줌
    - 첫번째 인자 : 사용했을 때 경고 메시지를 출력할 함수
    - 두번째 인자 : 경고 메시지
*/
const dontUseMe = util.deprecate((x,y) => {
    console.log(x + y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');
dontUseMe(1, 2);

/*
    util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿔줌 
*/
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.error(error);
    });

/*    
    crypto.randomBytes(64, (err, buf) => {      // 64Byte 길이의 문자열을 만듬 → salt
        console.log(buf.toString('base64'));
    });
*/
