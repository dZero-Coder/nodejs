/*
    3-5-1. os
    - 노드는 os모듈에 정보가 담겨 있어 운영체제의 정보를 가져올 수 있음
*/

const os = require('os');

console.log('운영체제 정보 --------');
console.log('or.arch() : ', os.arch());                     // 프로세스 아키텍처 정보
console.log('or.platform() : ', os.platform());             // 운영체제 플렛폼 정보
console.log('or.type() : ', os.type());                     // 운영체제의 종류
console.log('or.uptime() : ', os.uptime());                 // 운영체제 부팅 이후 흐른 시간(초)
console.log('or.hostname() : ', os.hostname());             // 컴퓨터의 이름
console.log('or.release() : ', os.release());               // 운영체제의 버전

console.log('경로 -----------------')
console.log('or.homedir() : ', os.homedir());               // 홈 디렉터리 경로
console.log('or.tmpdir() : ', os.tmpdir());                 // 임시 파일 저장 경로

console.log('cpu 정보 -------------')
console.log('or.cpus() : ', os.cpus);                       // 컴퓨터 코어 정보
console.log('os.cpus().length : ', os.cpus().length);       // 코어 개수 -> cluster 모듈을 사용하는 경우 코어의 개수에 맞춰 프로세스를 늘림

console.log('메모리 정보 -----------')
console.log('or.freemem() : ', os.freemem());               // 사용 가능한 메모리
console.log('or.totalmem() : ', os.totalmem());             // 전체 메모리 용량