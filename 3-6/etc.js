/*
    3-6-6. 기타 메서드
    
    fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지 검사
        옵션 : 옵션에 해당하지 않으면, ENOENT 에러를 발생
        - F_OK : 파일 존재 여부
        - R_OK : 읽기 권한 여부
        - W_OK : 쓰기 권한 여부

    fs.mkdir(경로, 콜백) : 폴더 생성을 위한 메서드, 이미 폴더가 존재하면 err 발생

    fs.open(경로, 옵션, 콜백) : 파일ID (fd 변수)를 가져오기 위한 메서드, 파일이 없으면 파일생성 후 아이디를 가져옴
                                fs.read()나 fs.write()를 이용해 읽거나 쓸 수 있음
        옵션
        - w : 쓰기
        - r : 읽기
        - a : 기존 파일에 이어서 쓰기
    
    fs.rename(기존경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드
 */
const fs = require('fs');

fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, 
    (err) => {
        if (err) {
            if (err.code === 'ENOENT'){
                console.log('폴더가 없음');
                fs.mkdir('./folder', (err) => {
                    if(err) {
                        throw err;
                    }
                    console.log('폴더 만들기 성공')
    
                    fs.open('./folder/file.js', 'w', (err, fd) => {
                        if(err) {
                            throw err;
                        }
                        console.log('빈 파일 만들기 성공 : ', fd);
        
                        fs.rename('./folder/file.js', './folder/newFile.js', (err) => {
                            if(err){
                                throw err;
                            }
                            console.log('이름 바꾸기 성공')
                        });
                    });
                });
            }else{
                console.log('이미 폴더가 있음')
            }
        }
});

/*
    fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인 메서드

    fs.unlink(경로, 콜백) : 파일 삭제 메서드 (파일이 없으면 에러)

    fs.rmdir(경로, 콜백) : 폴더 삭제 메서드 (폴더안에 파일이 있으면 에러)
*/
fs.readdir('./folder', (err, dir) => {
    if(err){
        throw err;
    }
    console.log('폴더 내용 확인', dir);

    fs.unlink('./folder/newFile.js', (err) => {
        if(err){
            throw err;
        }
        console.log('파일 삭제 성공');

        fs.rmdir('./folder', (err) => {
            if(err){
                throw err;
            }
            console.log('폴더 삭제 성공');
        });
    });
});

/*
    - 노드 8.5 버전 이후 추가된 파일 복사 방법
    copyFile(복사할 파일, 복사할 위치, 콜백)
*/
fs.copyFile('readme.txt', 'copy.txt', (err) => {
    if(err){
        return console.error(err);
    }
    console.log('복사 완료');
});

