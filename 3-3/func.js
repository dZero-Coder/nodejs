/*
    3-3. 모듈로 만들기
    - 모듈을 불러와서 odd와 even 대입 (비구조화 할당)
*/
const { odd, even } = require('./var');

// 숫자의 홀짝을 판별하는 함수 선언
function checkOddOrEven(num){
    if ( num % 2){
        return odd;
    }
    return even;
}

// module.exports객체에 함수 대입
module.exports = checkOddOrEven;