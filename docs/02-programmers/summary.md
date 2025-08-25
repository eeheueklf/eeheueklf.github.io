---
sidebar_position: 2
---

# JS 기본 메서드 정리

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
문제를 Day별로 풀고 정리한 내용입니다.
:::


## 입문 & 기초


:::warning
### 사용되는 메서드 정리

배열 메서드

- 배열 생성/초기화  
    `Array.from(arrayLike, mapFn)` ❇️ 배열 생성 | 유사 배열 객체로 배열 생성  
    `fill(value, start, end)` ❇️ 배열 채우기 | 원본 변경  
    `splice` ❇️ 요소 삭제/추가 | 원본 배열 변경  

- 배열 탐색/확인  
    `includes` 🔍 배열에 값 존재 여부 확인  
    `find` 🔍 조건을 만족하는 첫번째 요소 반환  
    `findIndex` 🔍 조건을 만족하는 첫번째 요소의 인덱스 반환  

- 배열 순회  
    `forEach` ✨ 각 요소에 대해 함수 실행  
    `map` ✨ 각 요소를 변환해서 새 배열 반환  
    `reduce` ✨ 하나의 누적된 값  
    `filter` ✨ 조건을 통과한 요소만 새 배열 생성  
    `some` ✨ 조건을 만족하는 요소가 있으면 true  
    `every` ✨ 모든 요소가 조건을 만족하면 true  

- 기타  
    `sort` 💚 배열 정렬 | 원본 변경  
    `push/pop` 💚 요소 추가 | 원본 변경  
    `join('')`  💚 배열을 문자열로  

문자열 메서드

- 문자 접근/코드  
    `charAt(index)` 💟 특정 위치의 문자 반환  
    `charCodeAt(index)` 💟 특정 위치 문자의 아스키 번호 반환

- 문자열 검색/확인  
    `indexOf` 🔍 찾으려는 문자열의 첫번째 인덱스 반환  
    `lastIndexOf` 🔍 찾으려는 문자열의 마지막 인덱스 반환  
    `includes` 🔍 문자열 포함 여부 확인  
    `match(regexp)` 🔍 정규식으로 일치하는 부분 검색

- 문자열 치환/변환  
    `substr(start, length)` 🔄 일정 길이로 문자열 자르기  
    `substring(indexStart[, indexEnd])` 🔄 인덱스로 문자열 자르기  
    `replace(pattern, replacement)` 🔄 문자열에서 첫번째 특정 패턴 치환  
    `replaceAll(pattern, replacement)` 🔄 문자열에서 모든 특정 패턴 치환  
    `.toUpperCase()` 🔄 문자열을 대문자로 변환  
    `.toLowerCase()` 🔄 문자열을 소문자로 변환  
    `trim()` 앞뒤 공백 제거 | 새 문자열 반환

- 기타  
    `split('')`  💜 문자열을 배열로  
    


문자열/배열 공용 메서드

- 문자열/배열  
    `indexOf` 🔍 찾으려는 첫번째 인덱스 반환  
    `lastIndexOf` 🔍 찾으려는 마지막 인덱스 반환  
    `includes` 🔍  포함 여부 확인  
    `slice` 🔄  문자열/배열 자르기 | 새 문자열/배열 반환  
    `forEach` ⏺️ 각 요소에 대해 부가적인 실행   


추가
- 자료구조  
    `new Set()` 배열 중복 제거  
    `new Map()` 키-값 쌍  
    `map.has(key)` key가 있는지   
    `map.get(key)` key에 해당하는 값 가져오기
 
- 구조분해할당과 변수 스왑  
    `[a,b] = [b,a]` swap

- 정규식    
    `/zero|one|two|.../g` OR 패턴, 전역 치환  
    `new RegExp(str,'g')` 문자열 동적 패턴

- 수학  
    `Math.max` 최댓값, `Math.min` 최솟값  
    `Math.pow`, `2 ** x` 거듭제곱  
    `Math.log2` 2를 밑으로 한 로그  
    `Math.floor` 소수 내림  
    `Math.ceil` 소수 올림  
    `Math.abs` 절댓값  
    `parseInt(str, radix)` 문자열을 _진법의 정수로 변환  
    `toString(radix)` 정수를 _진법의 문자열로 변환
:::