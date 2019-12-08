/*
    3-8-3. 예측 불가능한 에러 예외처리
    - process에 uncaughtException 이벤트 리스너 장착하여
    - 처리하지 못한 에러가 발생하면 이벤트 리스너가 실행되고 프로세스 유지
*/
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버 에러')
}, 1000);

setTimeout(() => {
    console.log('실행')
}, 2000);