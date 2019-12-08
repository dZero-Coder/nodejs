/*
    3-3. 모듈로 만들기    
    - 노드는 코드를 모듈로 만들어 하나의 프로그램이면서 다른 프로그램의 부품으로 사용할 수 있음
    - 파일별로 코드를 모듈화하여 관리하기가 편리함
    - p.78 그림
*/

// require()를 통해 각 변수와 함수를 변수처리
const { odd, even } = require('./var');
const checkNumber = require('./func');

// 문자열 길이의 홀짝을 판별하는 함수 선언
function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));       // func.js의 checkNumber
console.log(checkStringOddOrEven('hello')); // 해당 파일의 checkStringOddOrEven
