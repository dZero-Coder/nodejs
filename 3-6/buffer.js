/*
    3-6-5. buffer와 stream
    - 파일을 읽거나 쓰는 방식은 크게 버퍼를 이용하는 방식과 스트림을 이용하는 방식이 있음
    buffer : 노드는 메모리에 파일 크기만큼 공간을 마련해두며, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 해줌
    stream : 버퍼의 크기를 작게 만들어서 여러번 나눠서 보내는 방식
*/

/*
    from(문자열) : 문자열을 버퍼로 바꿀 수 있음
    length : 버퍼의 크기를 반환 (바이트 단위)
    toString() : 버퍼를 다시 문자열로 바꿀 수 있음
                (base64나 hex를 인자로 넣으면 해당 인코딩으로도 변환)
    concate(배열) : 배열 안에 든 버퍼들을 하나로 합침
    alloc(바이트) : 빈 버퍼를 생성함 (바이트를 인자로 지정하면 해당 크기의 버퍼가 생성)
*/
const buffer = Buffer.from('버퍼로 바꾸기');
console.log('from() : ', buffer);
console.log('length() : ', buffer.length);
console.log('toString() : ', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat() : ', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc() : ', buffer3);

console.log('--------------------------------------------------');
/*
    createReadStream() : 읽기 스트림 생성 (hightWaterMark : 버퍼의 크기)
    readStream() : 이벤트 리스너를 붙여서 사용
        data : 파일을 읽기 시작하면 호출
        end : 파일을 다 읽으면 호출
        err : 에러가 발생하면 호출

*/
const fs = require('fs');
const readStream = fs.createReadStream('./readme.txt', {highWaterMark: 16});
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data : ', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end : ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error', err);
});

console.log('--------------------------------------------------');
/*
    createWriteStream() : 쓰기 스트림 생성
    writeStream() : 이벤트 리스너를 붙여서 사용
        finish : 파일 쓰기가 종료되면 호출
    write() : 파일에 쓸 자료를 매개변수로 넘김
    end() : 파일 쓰기 종료를 알림
*/
const writeStream = fs.createWriteStream('./writeme.txt');

writeStream.on('finish', () => {
    console.log('파일 쓰기 완료')
});

writeStream.write('글을 쓰자')
writeStream.write('한번 더 글을 쓰자')
writeStream.end();

console.log('--------------------------------------------------');
/*
    파이핑
    - createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓰기
*/
const rs = fs.createReadStream('./readme.txt');
const ws = fs.createWriteStream('./writeme.txt');

readStream.pipe(ws);