/*
    4-2-1. REST API
    - REpresentational State Transfer의 약어로 네트워크 구조의 한 형식
    - 서버의 자원을 정의하고, 자원에 대한 주소를 지정하는 방법을 가리킴
    - 주소(/user) 외에도 HTTP 요청 메서드를 사용함
        - GET : 서버 자원을 가져오고자 할 때 사용하며, 요청 본문에 데이터를 넣지 않고 쿼리스트링을 통해 데이터를 전달
        - POST : 서버에 자원을 새로 등로하고자 할 때 사용하며, 요청 본문에 새로 등록할 데이터를 넣어 보냄
        - PUT : 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용하며, 요청 본문에 치환할 데이터를 넣어 보냄
        - PATCH : 서버 자원의 일부만 수정하고자 할 때 사용하며, 요청 본문에 일부 수정할 데이터를 넣어 보냄
        - DELETE : 서버의 자원을 삭제하고자 할 때 사용
    - RESTful : REST API를 따르는 서버를 RESTful 하다고 표현
*/
function getUser(){
    var xhr = new XMLHttpRequest();                         // XMLHttpRequest 객체 생성
    xhr.onload = function() {                               // 브라우저가 서버로부터 응답을 받을 때 발생하는 이벤트
        if(xhr.status === 200){                             // 서버 응답이 정상
            var users = JSON.parse(xhr.responseText);       // 서버에 요청하여 응답으로 받은 데이터를 문자열을 객체로 변환
            var list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map(function(key){               // 
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function(){
                    var name = prompt('바꿀 이름을 입력하세요.');
                    if (!name){
                        return alert('이름을 반드시 입력하셔야 합니다.');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        }else{
                            console.error(xhr.responseText);
                        }
                    }
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name: name}));
                });
                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function(){
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function (){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        }else{
                            console.error(xhr.responseText);
                        }
                    }
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', '/users');
    xhr.send();
}

window.onload = getUser; // 로딩 시 getUser 호출

// form 제출
document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    var name = e.target.username.value;
    //console.log(e.target);    // form
    if(!name){
        return alert('이름을 입력하세요.');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 201){
            console.log(xhr.responseText);
            getUser();
        }else{
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', '/users');                                 // /users 로 POST 방식으로 요청 준비
    xhr.setRequestHeader('Content-Type', 'application/json');   // 타입은 JSON
    xhr.send(JSON.stringify({name:name}));                      // JSON.stringify() : JavaScript 값이나 객체를 JSON 문자열로 변환
    e.target.username.value = '';
});