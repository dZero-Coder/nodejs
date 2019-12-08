/*
    3-5-3. url
    - 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
*/

const url = require('url');

// WHATWG 방식
const URL = url.URL;
const whatwgUrl = new URL('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('new URL() : ', whatwgUrl);
console.log('url.format() : ', url.format(whatwgUrl));

// 기존의 url 방식
console.log('----------------------------------------')
const parsedUrl = url.parse('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')
console.log('url.parse() : ', parsedUrl);
console.log('url.format() : ', url.format(parsedUrl));

/*
    url.parse() : 주소를 분해
    → WHATWG의 username, password 대신 auth 속성이 존재, searchParams 대신 query가 존재

    url.format() : url 객체를 다시 원래 상태로 조립

    ※ 노드의 url 형식을 꼭 사용해야하는 경우
    - 주소가 host부분 없이 pathname 부분만 오는 경우 ex) /book/view
*/

console.log('--------------------------------------------------------------------------')

/*
    searchParams
    - WHATWG 방식의 search을 searchParams라는 특수 객체로 반환하여 유용하며, 데이터 전달에 사용함
    ex) search : ?page=3&limit=10&category=nodejs&category=javascript
*/
//const { URL } = require('url');

const myURL = new URL('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams.getAll() : ', myURL.searchParams.getAll('category'));         // key에 해당하는 모든 값들을 가져옴
console.log('searchParams.get() : ', myURL.searchParams.get('limit'));                  // key에 해당하는 첫번째 값만 가져옴
console.log('searchParams.has() : ', myURL.searchParams.has('page'));                   // 해당 key가 존재하는지 검사

console.log('searchParams.keys() : ', myURL.searchParams.keys());                       // searchParams의 모든 키를 객체로 반환
console.log('searchParams.values() : ', myURL.searchParams.values());                   // searchParams의 모든 값을 객체로 반환

myURL.searchParams.append('filter', 'es3');                                             // 해당 키를 추가
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');                                                // 이전 키를 모두 지우고 새로 추가
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter', 'es6');                                             // 해당 키를 삭제
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString() : ', myURL.searchParams.toString());               // 조작한 searchParams 객체를 다시 문자열로 만듬
myURL.search = myURL.searchParams.toString();                                           // search에 대입 : 주소 객체에 반영

console.log('--------------------------------------------------------------------------')

/*
    querystring
    - WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때 search 부분을 사용하기 쉽게 객체로 만드는 모듈
*/
//const url = require('url');
const querystring = require('querystring');

//const parsedUrl = url.parse('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse() : ', query);                                   // url의 query 부분을 js 객체로 분해
console.log('querystring.stringify() : ', querystring.stringify(query));        // 분해된 query 객체를 문자열로 재조립