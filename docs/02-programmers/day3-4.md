---
sidebar_position: 2
---

# Day 3-4 | forEach와 map 활용하기

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
**코딩 기초 트레이닝**, **코딩테스트 입문** 문제를 Day별로 풀고 정리한 내용입니다.
:::

:::warning
#### ✨Day 3-4
JavaScript에서 많이 쓰이는 forEach, map, 스프레드 연산자에 익숙해져보자

**목표**: for 반복문 대신 JS의 forEach와 map 써보기  
반복문을 써야하는 코드가 많은데 JS의 **forEach, map** 메서드를 잘 활용해보자!  
JS에서 배열을 순회하는 방법 중 forEach와 map 메서드는 자주 쓰이면서도 다른 방식으로 사용된다.

**forEach**
- 배열의 각 요소를 하나씩 실행할 때 사용
- **반환값이 없고** 그냥 반복 작업용
- 배열을 순회하며 콘솔 출력, 변수 변경 등을 할때 사용된다

```jsx
const numbers = [1, 2, 3];
numbers.forEach((value, index) => {
  console.log(`index: ${index}, value: ${value}`);
});
// index: 0, value: 1
// index: 1, value: 2
// index: 2, value: 3
```
**map**

- 배열의 각 요소에 대해 함수를 적용한 **새 배열**을 반환
- 원본 배열은 변경하지 않음
- 반환된 새 배열을 바로 변수에 저장 혹은 리턴 가능

```jsx
const names = ['alice', 'bob', 'charlie'];
const upperNames = names.map(name => name.toUpperCase());
console.log(upperNames); // ["ALICE", "BOB", "CHARLIE"]
```

즉  
**각 원소를 변환할때 → map,**  
**각 요소에 대한 부가적인 실행 필요→ forEach**  
만약 배열 각 요소를 2배로 만드는 문제가 나온다면?  
```jsx
function solution(numbers) {
    var answer = [];
    numbers.forEach((value,index)=>
        answer[index] = value*2
    )
    return answer;
}
```

```jsx
const solution(numbers){
	return numbers.map((number) => number * 2)
}
```

forEach, map 둘 다 사용 가능하지만 map이 더 간단하게 구현 가능하다 ~
:::

---
    
## 기초

### 문자열 섞기
- `answer += str1[i]` 문자열에 문자열 붙이기
- `for(시작;조건;종료)` 반복문
   
자바스크립트에서 문자열은 불변하므로 새로운 문자열을 만들어 `str1` `str2`를 더해주었다.

```jsx
function solution(str1, str2) {
    var answer = '';
    for(let i=0;i<str1.length;i++){
        answer += str1[i]
        answer += str2[i]
    }
    return answer;
}
```

**✨개선코드**

*str1의 각 원소를 변환하기 때문에 map 사용*

- `[…str1]` 문자열을 배열로 변환
- `.map` 배열 순회하면서 주어진 콜백 함수 적용 → 새 배열 반환
- `.join("")` 배열을 문자열로 바꾸기 (문자열 합치기)

```jsx
function solution(str1, str2) {
    return [...str1].map((value,idx)=> value+str2[idx]).join("");
}

// [...str1] → str1을 배열로 바꾸기
// map → str1 배열 순회
// value(str[index] 값) + str2[index] 문자열을 이어붙임
// .join("") → 문자열로 바꾸기

str1 = 'aaa', str2 = 'bbb'
//[...str1] → ['a', 'a', 'a']
//map 결과 → ['ab', 'ab', 'ab]
```
---
### 더 크게 합치기

- `function` 매개변수를 받아서 출력값을 반환함

⊕연산을 plusc 함수로 구현 → 숫자를 문자열로 변환하여 붙였다

```jsx
function plusc(a, b){
    a *= 10 ** String(b).length;
    return a + b
}

function solution(a, b) {
    var answer = 0;
    answer = plusc(a,b) > plusc(b,a) ? plusc(a,b) : plusc(b,a)
    return answer;
}
```

**✨개선코드**

- `Math.max()` 매개변수로 받은 숫자 중 최대값 반환
- `Number()` 문자열을 숫자로 변환
- ``...`` 변수나 표현식을 넣을 수 있는 문자열 표기법
- `${a}${b}` a와 b를 문자열로 변환한 뒤 붙임

```jsx
function solution(a, b) {
    return Math.max(Number(`${a}${b}`), Number(`${b}${a}`))
}
```
---
### 조건 문자열 (크기 비교)

- `조건문 ? 참 : 거짓` 조건문이 참일경우 참 수행, 거짓일 경우 거짓 수행

삼항 연산자를 사용하여 n과 m의 관계가 미만(2) 초과 (1) 같을때(0) 의 케이스로 나누었다  

```jsx
function solution(ineq, eq, n, m) {
    switch (n >= m ? (n>m ? 1 : 0) : 2) {
      case 0:
            return eq==='=' ? 1:0;
      case 1:
            return ineq==='>' ? 1:0;
      case 2:
            return ineq==='<' ? 1:0;
    }
}
```

**✨개선코드**

- **자바스크립트 객체** `ops` 여러 개의 키-값 쌍을 담을 수 있는 데이터 유형

```jsx
function solution(ineq, eq, n, m) {
  const ops = {
    '>=': n >= m,
    '<=': n <= m,
    '>!': n > m,
    '<!': n < m
  };
  return ops[ineq + eq] ? 1 : 0;
}

//ops 객체는 키-값 쌍으로 저장됨
//ineq+eq는 객체의 키

// n=3, m=1
// ineq = '>', eq = '='
// ops['>='] → true
```

---

## 입문

### 중앙값 구하기

- `.sort` 배열 요소 정렬, 생략시 문자열로 취급하여 유니코드 순서대로 정렬됨
- `Math.floor` 소수점 버림

array.length가 홀수일 경우 소수점을 버려서 중앙값을 구했습니다.

```jsx
function solution(array) {
  return array.sort((a, b) => a - b)[Math.floor(array.length / 2)];
}
```
---

### 배열의 평균값

**numbers의 각 원소에 대한 실행 → forEach**

- 정수 배열 `numbers`
- 원소의 평균값
- `forEach`  배열 순회하면서 주어진 콜백 함수 적용

```jsx
function solution(numbers) {
    let sum =0;
    numbers.forEach((value)=>sum += value)
    return sum/numbers.length;
}
```
---

### 최빈값구하기

- `객체` 여러 개의 키-값 쌍을 담을 수 있는 데이터 유형
- `.entries()` 객체를 배열로 변환
- `(count[val] || 0)` (스킬) count[val]이 없으면 0 있으면 그대로

```jsx
function solution(array) {
    const count = {};
    array.forEach(val => {
        count[val] = (count[val] || 0) + 1;
    });
    const arr = Object.entries(count).sort((a, b) => b[1] - a[1]);
    return arr.length > 1 && arr[0][1] === arr[1][1] ? -1 : Number(arr[0][0]); 
}

```

**✨개선코드**

- `map` 객체처럼 키-값 쌍 저장

```jsx

function solution(array) {
    let m = new Map();
    for (let n of array) m.set(n, (m.get(n) || 0)+1);
    m = [...m].sort((a,b)=>b[1]-a[1]);
    return m.length === 1 || m[0][1] > m[1][1] ? m[0][0] : -1;
}
```
---

### 피자나눠먹기1, 3

- `Math.ceil` 소수점 버림

```jsx
const solution = (n) => Math.ceil(n/7)

const solution = (slice, n) => Math.ceil(n/slice)
```
---

### 피자나눠먹기2

사람수(n)만큼 피자 시키면 모두가 한 판씩 먹으면 되니 최댓값을 n으로 두고  
6 x (먹어야 하는 조각 수)를 사람 수로 나눈 나머지가 0일때 리턴했다.

```jsx
function solution(n) {
    for(let i=1;i<=n;i++)
        if((6*i)%n===0)
            return i
}
```
