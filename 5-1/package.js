/*
    5-1-1. npm
    - Node Package Manager의 약어로 노드 패키지 매니저
    - npm에 업로드된 노드 모듈을 패키지라고하며, 패키지가 다른 패키지를 사용할 수 있으며, 이를 의존 관계라고 부름

    package.json : 설치한 패키지의 버전을 관리하는 파일
        npm init → package.json을 만드는 명령어 (console로 프로젝트를 시작할 폴더로 이동)

    cmd → 5-1 → npm init → package.json 생성

    {
        "name": "5-1",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            // npm 명령어를 저장해두는 부분
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC"
    }

    npm i [패키지명]
    ▶ install : i
    ▶ --save-dev : -D
    ▶ --global : -g

    패키지 버전
    - SemVer 방식의 버전 넘버링 ( 1.1.0 )
    - 첫번째 자리 : major 버전 (하위 호환이 되지 않는 변경 사항)
    - 두번째 자리 : minor 버전 (하위 호환이 되지 변경 사항)
    - 세번째 자리 : patch 버전 (간단한 버그 수정)

    npm outdated : 업데이트할 수 있는 패키지의 존재 여부 확인
    npm uninstall [패키지명] : 해당 패키지 제거
    npm search [검색어] : npm의 패키지 검색
    npm info [패키지명] : 패키지의 세부 정보를 파악
    npm adduser : npm 로그인을 위한 명령어
    npm whoami : 로그인한 사용자가 누구인지 알려줌
    npm logout : npm adduser로 로그인한 계정을 로그아웃
    npm version [버전] : package.json의 버전을 올려줌
    npm deprecate [패키지명][버전] [메시지] : 해당 패키지를 설치할 때 경고 메시지를 띄움
    npm publish : 자신이 만든 패키지를 배포
    npm unpublish : 배포한 패키지를 제거
*/
