/*
    process.nextTick()로 받은 콜백 함수와 resolve된 Promise는 다른 이벤트 루프에서
    대기하는 콜백 함수보다도 먼저 실행됨 그래서 비동기 처리할 때 setImmediate보다
    process.nextTick을 더 선호하는 개발자도 있음
    하지만, 이러한 Microtask를 재귀호출하게 되면 이벤트 루프는 다른 콜백 함수보다
    Microtask를 우선하여 처리하므로 콜백 함수들이 실행되지 않을 수도 있음

    참고 https://blog.outsider.ne.kr/739
*/

setImmediate(() =>{
    console.log('immediate');
});

process.nextTick(()=>{
    console.log('nextTick');
});

setTimeout(()=>{
    console.log('timeout');
}, 0);

Promise.resolve().then(()=>console.log('promise'));