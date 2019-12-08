/*
    3-4-3. 타이머
*/

/*
    setTimeout(callback, millisecond)
    -> 주어진 millisecond 이후에 callback를 실행
*/
const timeout = setTimeout(() =>{
    console.log('1.5초 후 실행');
}, 1500);

/*
    setInterval(callback, millisecond)
    -> 주어진 millisecond 마다 callback를 실행
*/
const interval = setInterval(() =>{
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() =>{
    console.log('실행되지 않음');
}, 3000);

setTimeout(() =>{
    clearTimeout(timeout2);     // clearTimeout(id) -> setTimeout을 취소
    clearInterval(interval);    // clearInterval(id) -> setInterval을 취소
}, 2500);

/*
    setImmediate(callback)
    -> callback를 즉시 실행
*/
const immediate = setImmediate(()=>{
    console.log('즉시 실행');
});

const immediate2 = setImmediate(()=>{
    console.log('실행되지 않음')
});

clearImmediate(immediate2);     // clearImmediate(id) -> setImmediate를 취소