/*
    3-4-6. process
    - 현재 싱핼되고 있는 노드 프로세스에 대한 정보를 담고 있음
*/

console.log(process.version)    // 설치된 노드의 버전
console.log(process.arch)       // 프로세서 아키텍처 정보 (arm, ia32 등)
console.log(process.platform)   // 운영체제 플랫폼 정보
console.log(process.pid)        // 현재 프로세스의 아이디
console.log(process.uptime())   // 프로세스가 시작된 후 흐른 시간
console.log(process.execPath)   // 노드의 경로
console.log(process.cwd())      // 현재 프로세스가 실행되는 위치
console.log(process.cpuUsage()) // 현재 cpu 사용량

/*
    process.env
    -> 시스템의 환경변수를 출력할 수 있음
    -> 서비스의 중요한 키를 저장하는 공간으로도 사용됨
    -> 서버나 데이터베이스의 비밀번호와 각종 API 키를 코드에 직접 위험하는 것이 아니라
        process.env의 속성으로 대체
*/

// process.env에 직접 SECRET_ID와 SECRET_CODE를 넣어줘야함
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
console.log(secretId)
console.log(secretCode)

/*
    process.nextTick(콜백)
    - 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 함
    - process.nextTick → Promise → timeout → immediate
    - process.nextTick과 Promise는 마이크로태스크라고 구분지어 부름
*/
setImmediate(()=>{
    console.log('immediate');
});

process.nextTick(()=>{
    console.log('nextTick');
});

setTimeout(()=>{
    console.log('timeout');
}, 0);

Promise.resolve.then(() => console.log('promise'));

/*
    process.exit()
    - 실행중인 노드 프로세스를 종료
    - 서버에 사용하면 서버가 멈추므로 서버에는 거의 사용하지 않음
    - 독립적인 프로그램에서는 수동으로 노드를 멈추게 하기 위해 사용
*/

let i = 1;
setInterval(() => {
    if(i===5){
        console.log('종료!');
        process.exit();
    }
    console.log(i);
    i++;
}, 1000);

/*
    setInterval()로 반복되는 코드를 exit() stop
 */