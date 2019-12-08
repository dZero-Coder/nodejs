/*
    3-4-2. console
    - window 대신 global 객체안에 들어있습니다.
*/
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outter: {
        inner: {
            key: 'value',
        },
    },
};

/*
    console.time(label)
    -> console.timeEnd(label)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정
*/
console.time('전체 시간');

/*
    console.log(msg)
    -> msg를 콘솔에 표시
*/
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);

/*
    console.error(errMsg)
    -> errMsg를 콘솔에 표시
*/
console.error('에러 메시지는 console.error에 담아주세요');
/*
    console.dir(obj, option)
    -> 객체를 콘솔에 표시할 때 사용
    obj : 표시할 객체
    option : color(콘솔에 색 추가), depth(객체를 몇단계로 보여줄지 default: 2)
*/
console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:1});

console.time('시간 측정');
for (let i=0; i<100000; i++){
    continue;
}
console.timeEnd('시간 측정')

function b(){
    /*
        console.trace(label)
        -> 에러가 어디서 발생했는지 추적할 수 있게 해줌
    */
    console.trace('에러 위치 추적');
}

function a(){
    b();
}
a();

console.timeEnd('전체 시간');