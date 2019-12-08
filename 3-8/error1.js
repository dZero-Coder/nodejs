/*
    3-8-1. 예외처리
    - 예외 : 보통 처리하지 못한 에러 (노드 프로세스를 멈추게 함)
*/

setInterval(() => {
    console.log('시작');

    try{
        throw new Error('서버 고장');
    }catch (err){
        console.error(err);
    }
}, 1000);