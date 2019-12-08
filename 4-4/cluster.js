/*
    4.4-1. cluster
    - 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
    - 포트를 공유하는 노드 프로세스를 여러 개 둘 수 있어 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청 분산
    - 마스터 프로세스와 워커 프로세스가 존재
*/
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;    // CPU의 갯수

// 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 생성
if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);

    // CPU 갯수만큼 워커를 생산
    for (let i=0; i<numCPUs; i+=1){
        cluster.fork();
    }

    // 워커가 종료된 경우
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    });
}else{
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        // 접근시
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');

        // 1초 후 종료
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(9010);

    console.log(`${process.pid}번 워커 실행`);
}

// CPU 갯수만큼 새로고침을 하면, 모든 워커가 종료되어 서버 응답x