/*
    3-4-1. 내장 객체 Global
*/

const A = require('./globalA');

globalThis.message = '안녕하세요.';
console.log(A());   // 안녕하세요.