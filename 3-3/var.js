/*
    3-3. 모듈로 만들기
    - 변수가 정의되어 있는 모듈
*/

// 변수 선언
const odd = '홀수';
const even = '짝수';

// module.exports객체에 변수 대입
module.exports = {
    odd,
    even,
}

/*
    module.exports와 exports가 같은 객체를 참조

    exports -> module.exports -> {}
    
*/
//exports.odd = '홀수'
//exports.even = '짝수'