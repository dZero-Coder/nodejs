/*
    3-4-1. 내장 객체 Global
    - 브라우저의 windows와 같은 전역 객체이며, 모든 파일에서 접근할 수 있음
    - require()은 global.require()으로 global이 생략됨
 */
module.exports = () => global.message;