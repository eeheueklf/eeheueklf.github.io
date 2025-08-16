---
sidebar_position: 2
---

# Day 7-8 | filter & 2차원 배열 순회

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
**코딩 기초 트레이닝**, **코딩테스트 입문** 문제를 Day별로 풀고 정리한 내용입니다.
:::

:::warning
#### ✨Day 7-8
기초보다 입문 난이도가 더 쉬워서 입문부터 하는걸 추천함

**목표**: 새로운 메서드의 등장 filter & 2차원 배열 순회
- `forEach` ✨ 배열 순회 메서드 | 각 요소에 대해 부가적인 실행    
    `array.map((v,idx)=> console.log(v))`
    
- `map` ✨ 배열 순회 메서드 | 각 요소를 변환해서 새 배열 반환    
    `array.map((v,idx)=> Number(v))`
    
- `reduce` ✨ 배열 순회 메서드 | 하나의 누적된 값    
    `array.reduce((acc,cur)=> acc + cur)`
    
- `filter` ✨✨ 배열 순회 메서드 | 조건을 통과한 요소만 새 배열 생성    
    `array.filter((v,idx)=> v%2===0)`
    
- 2차원 배열 순회와 구조분해할당

    ```jsx
    const queries = [[1, 3, 5], [2, 4, 7]];
    queries.forEach(([s, e, k]) => {
    console.log(s, e, k); 
    });
    ```
:::

---
    
## 입문

### 특정 문자 제거하기

*각 요소를 조건에 따라 걸러야 할때 → filter*

- `filter` 로 letter와 다른 문자만 통과
- `.join` 으로 배열 → 문자열

```jsx
const solution(my_string, letter){
	return [...my_string].filter(ch => ch !== letter).join('');
}
```
---

### 각도기

- 각도에 따라 return

```jsx
function solution(angle) {
    if(angle>90)
        if(angle===180) return 4;
        else return 3;
    else
        if(angle===90) return 2;
        else return 1;
}
```

**✨ 신기한 코드**

- `.filter` 로 [0, 90, 91, 180] 중 angle보다 작거나 같은 값을 뽑아 길이 세기

```jsx
function solution(angle) {
    return [0, 90, 91, 180].filter(x => angle>=x).length;
}
```
---

### 외계행성의 나이

*각 원소를 변환 → map*

- 각 숫자(일의자리)를 알파벳으로 변환하기
- `.map` 배열 돌면서 val을 97 + Number(val)로 바꿈
- `.fromCharCode` 아스키코드 값으로 변환

```jsx
const solution(age){
	String.fromCharCode(...[...String(age)].map(val => 97 + Number(val)));
}
```

**✨ 개선 코드**

- `.toString()` age를 문자열로
- `.split("")` 문자열을 배열로
- `.map` 배열 순회 - 문자열자체도 인덱스가 있으니 v로 접근 가능
- `.join("")` 배열을 문자열로

```jsx
function solution(age) {
  return age
    .toString()
    .split("")
    .map((v) => "abcdefghij"[v])
    .join("");
}

```
---

### 진료 순서 정하기

*각 원소를 변환 → map*

- 정수 배열 `emergency`
- 높은 순서대로 진료 순서 정하기
- `emergency`를 내림차순으로 정렬한 배열 `sorted`
- `.map`으로 `emergency` 순회하면서 `sorted`의 인덱스+1

```jsx
function solution(emergency) {
    const sorted = [...emergency].sort((a, b) => b - a);
    return emergency.map((val) => sorted.indexOf(val)+1)
}
```
---

### 순서쌍의 개수

- 자연수 `n`
- 두 숫자의 곱이 `n`인 순서쌍 개수

```jsx
function solution(n) {
    var answer = 0;
    for(let i=0;i<=n;i++){
        for(let j=0;j<=n;j++){
            if(i*j===n) answer++
        }
    }
    return answer;
}
```

시간초과 (이중 for문)

**✨ 개선 코드**

- for문을 하나로 개선

```jsx
function solution(n) {
    var answer = 0;
    for(let i=1;i<=n;i++){
        if(n%i===0) answer++
    }
    return answer;
}
```

---

## 기초

### 수열과 구간 쿼리 4 

*각 원소에 대해 부가적인 실행 → forEach*

- 정수 배열 `arr`  2차원 정수 배열 `queries`
- `.forEach` queries 돌면서 조건에 맞는 값을 더함

```jsx
function solution(arr, queries) {
    queries.forEach((val)=>{
        for(let i=val[0];i<=val[1];i++){
            if(i%val[2]===0) arr[i]++;
        }
    })
    return arr;
}
```

**✨ 개선 코드**

- 2차원 배열에 `forEach` 적용가능 → `forEach(([s, e, k])`

```jsx
function solution(arr, queries) {
    queries.forEach(([s, e, k]) => {
        for (let i = s; i <= e; i++) {
            if (i % k === 0) arr[i]++;
        }
    });
    return arr;
}
```
---

### 배열만들기2

- **`l`**부터 **`r`**까지 숫자 중 모든 자릿수가 0이나 5인 수만 골라 배열로 반환

```jsx
function solution(l, r) {
    var answer = [];
    let flag;
    for(let i = l; i <= r; i++) {
        flag = true;
        [...i.toString()].forEach((val, idx) => {
            if(val%5!==0) flag = false;            
        })
        if(flag) answer.push(i)
    }
    return answer.length>0 ? answer : [-1];
}
```

**✨ 개선 코드**

- 숫자를 문자열로 변환해 각 자리 숫자를 검사해서, 모두 '0'이나 '5'인지 확인
- `every` 배열 순회 | 모든 요소가 조건 만족해야 true 반환

```jsx
function solution(l, r) {
    const result = [];
    for (let i = l; i <= r; i++) {
        if ([...String(i)].every(num => num === "0" || num === "5")) {
            result.push(i);
        }
    }
    return result.length > 0 ? result : [-1];
}

```
---

### 콜라츠 수열 만들기

- 모든 자연수 `x`에 대해서  `x`가 짝수일 때는 2로 나누고, `x`가 홀수일 때는 `3 * x + 1`로 바꾸는 계산 반복
- `while` 사용해 계산 반복함

```jsx
function solution(n) {
    var answer = [];
    while(n>1){
        answer.push(n)
        n%2===0 ? n /=2 : n = n*3+1;
    }
    answer.push(1);
    return answer;
}
```

- 재귀함수 사용

```jsx
function solution(n, arr = []) {
    arr.push(n)
    if (n === 1) return arr
    if (n % 2 === 0) return solution(n / 2, arr)
    return solution(3 * n + 1, arr)
}
```
---

### 주사위 게임 3

노가다로 품.

---

### 글자 이어붙여 문자열 만들기

*각 원소에 대한 부가적인 실행 → forEach*

- `.forEach`로 배열 돌면서 글자 이어붙임

```jsx
function solution(my_string, index_list) {
    var answer = '';
    index_list.forEach((val)=> answer+=(my_string[val]))
    return answer;
}
```

**✨ 개선 코드**

*각 요소를 변환 → map 사용 가능함*

- `map` 사용해서 인덱스를 문자로 바꿈

```jsx

function solution(my_string, index_list) {
    return index_list.map(i => my_string[i]).join('')
}
```
