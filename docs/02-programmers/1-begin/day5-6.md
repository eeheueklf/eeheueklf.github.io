---
sidebar_position: 2
---


# Day 5-6 | reduce & 구조분해할당

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
**코딩 기초 트레이닝**, **코딩테스트 입문** 문제를 Day별로 풀고 정리한 내용입니다.
:::

:::warning
#### ✨Day 5-6
기초보다 입문 난이도가 더 쉬워서 입문부터 하는걸 추천함

**목표**: 새로운 메서드의 등장 reduce & 구조분해할당
- `forEach` ✨ 배열 순회 메서드 | 각 요소에 대해 부가적인 실행    
    `array.map((v,idx)=> console.log(v))`
    
- `map` ✨ 배열 순회 메서드 | 각 요소를 변환해서 새 배열 반환    
    `array.map((v,idx)=> Number(v))`
    
- `reduce` ✨✨ 배열 순회 메서드 | 하나의 누적된 값    
    `array.reduce((acc,cur)=> acc + cur)`
- `구조분해할당` | 배열이나 객체를 풀어서 변수로 만드는 문법

    ```jsx
    //배열 구조 분해
    const fruits = ["apple", "banana", "cherry"];
    const [first, second, third] = fruits;

    //객체 구조 분해
    const user = { name: "kkabu", age: 20 };
    const { name, age } = user;
    ```
- 변수 스왑  
    `[a,b] = [b,a]` : swap
:::

---
    
## 입문

### 옷가게 할인 받기

- `Math.floor` 소수점 버림

각 구간을 나눠서 지불할 금액을 계산해주었다.

```jsx
function solution(price) {
    if(price >= 500000)
        return Math.floor(price * 0.8);
    else if(price >= 300000)
        return Math.floor(price * 0.9);
    else if(price >= 100000)
        return Math.floor(price * 0.95);
    else
        return price 
}
```

**✨개선코드**

- 할인조건과 할인율을 데이터 배열 `discounts` 로 관리
- 데이터 배열 돌면서 price가 더 크면 계산

```jsx
const discounts = [
    [500000, 20],
    [300000, 10],
    [100000,  5],
]

const solution = (price) => {
    for (const discount of discounts)
        if (price >= discount[0])
            return Math.floor(price - price * discount[1] / 100)
    return price
}
```
---

### 짝수 홀수 개수

*각 원소에 대한 부가적인 실행 → forEach*

- `forEach` 사용하여 num_list 돌면서 홀수, 짝수 개수 값 증가

```jsx
function solution(num_list) {
    let even=0, odd=0;
    num_list.forEach((val,idx)=> val%2===0 ? even++ : odd++)
    return [even,odd]
}
```
---

### 문자 반복 출력하기

*my_string의 각 원소를 변환 → map*

- `[…my_string]` 문자열을 배열로 변환하여 반복문 처리
- `map` 사용하여 my_string각 원소를 n번씩 반복한 결과 리턴
- `join('')` 으로 배열을 문자열로 합치기

```jsx
const solution (my_string, n) {
	return [...my_string].map((val)=>val.repeat(n)).join('')
}
```
---

## 기초

### 코드 처리하기

- 문자열 code
- 문자가 1이면 mode 바꾸기
- mode에 따라 행동

code 읽으면서 mode에 따라 달라지는 경우 구현

```jsx
function solution(code) {
    let mode = false;
    let ret = [];
    
    for(let idx=0;idx<code.length;idx++){
        if(code[idx]==='1'){            
            mode = !mode;
            continue;
        }
        if(mode){
            if(code[idx]===1) mode = false;
            else if(idx%2!==0) ret += code[idx];
        }
        else{
            if(code[idx]===1) mode = true;
            else if(idx%2===0) ret += code[idx];
        }
    }
    return ret.length===0 ? "EMPTY" : ret;
}
```

**✨개선코드**

*code의 원소에 따른 부가적인 실행 → forEach*

- `forEach`

```jsx
function solution(code) {
    let mode = false;
    let ret = '';

    [...code].forEach((value, idx) => {
        if (value === '1') mode = !mode;
        else if (mode && idx % 2 !== 0) ret += value;
        else if (!mode && idx % 2 === 0) ret += value;
    });

    return ret.length===0 ? "EMPTY" : ret;
}
```
---

### 등차수열의 특정한 항만 더하기

- 정수 a, d
- 길이가 n인 `boolean` 배열 `included`
- 첫째항이 a, 공차가 d인 등차수열
- `included`가 `true`인 항들만 더한 값 return

 등차수열 구현, included의 값에 따라 sum에 더함

```jsx
function solution(a, d, included) {
    let term=0, sum=0;
    for(let i=0;i<included.length;i++){
        term = a + (i * d);
        if(included[i]) sum+= term
    }
    return sum;
}
```

**✨개선코드**

*누적된 값을 구할때 → reduce*

- `reduce` ✨✨ 배열 순회 메서드 | 하나의 누적된 값
- `array.reduce((acc, cur, idx) => { ... }, 초기값)`
- acc 누적값 | cur 현재 요소 값 | idx 현재 인덱스
- `sum`이라는 하나의 누적된 값을 반환하기 위해
- (삼항 연산자) `include의 값이 true일때` ? `sum + a + idx * d` : `sum`

```jsx
function solution(a, d, included) {
    return included.reduce((sum, val, idx) => 
        val ? sum + a + idx * d : sum, 0);
}
```
---

### 마지막 두 원소

- 정수 배열 num_list
- 모든 원소들의 곱이 모든 원소들의 합의 제곱보다 작으면 1 크면 0

 마지막 두 원소를 last, secLast에 저장하고 계산함

```jsx
function solution(num_list) {
    const last = num_list[num_list.length-1];
    const secLast= num_list[num_list.length-2];
    last > secLast? num_list.push(last - secLast) : num_list.push(last*2)
    return num_list;
}
```

**✨개선코드**

- `구조분해 할당` 배열이나 객체의 속성을 해체하여 값을 개별 변수에 담음
- `slice()` 어떤 배열의 begin 부터 end까지 새로운 배열 객체로

```jsx
function solution(num_list) {
    const [sec, last] = num_list.slice(-2);
    last > sec ? num_list.push(last - sec) : num_list.push(last * 2);
    return num_list;
}
```
---

### 수 조작하기1

*각 원소에 대한 부가적인 실행 → forEach*

- 정수 `n` 문자열 `control`
- control 규칙에 따라 n을 바꿈

 control을 순회하며 규칙에 따라 n의 값 변경

```jsx
function solution(n, control) {
    [...control].forEach((val,idx)=>{
        if(val==='w') n++;
        else if(val==='s') n--;
        else if(val==='d') n+=10;
        else if(val==='a') n-=10;
        
    })
    return n;
}
```

**✨개선코드**

*누적값을 계산할 때 → reduce*

- 연산 결과가 미리 계산된 **객체** `operations`사용
- `reudce` 로 누적 계산

```jsx
const operations = {
  w: (n) => n + 1,
  s: (n) => n - 1,
  d: (n) => n + 10,
  a: (n) => n - 10,
};

function solution(n, control) {
  return [...control].reduce((prev, op) => operations[op](prev), n);
}
```
---

### 수 조작하기2

- 정수배열 `numLog`
- `numLog`의 조작을 위해 입력받은 문자열 return

 `numLog`의 값에 따라 문자를 추가

```jsx
function solution(numLog) {
    let answer = '';
    for(let i=1;i<numLog.length;i++){
        switch (numLog[i]- numLog[i-1]){
            case 1: answer += 'w'; break;
            case -1: answer += 's'; break;
            case 10: answer += 'd'; break;
            case -10: answer += 'a'; break;
        }
    }
    return answer;
}
```

**✨개선코드**

- 객체 `convert` 사용
- `map` 좀 신기한 방식이긴한데..
    
     **numLog에서 첫번째 요소를 제외한 배열**을 순회하면서 `numLog`와 차이를 계산
    

```jsx
function solution(numLog) {
    const convert = {
        '1': 'w', '-1': 's', '10': 'd', '-10': 'a'
    };

    return numLog.slice(1).map((v, i) => {
        return convert[v - numLog[i]]
    }).join('')
}
```

### 수열과 구간 쿼리

- 정수 배열 `arr` 2차원 정수 배열 `queries`
- 각 `query`마다 순서대로 `arr[i]`의 값과 `arr[j]`의 값을 바꿈

temp 사용해서 임시 값을 저장하고 값을 바꿈  

```jsx
function solution(arr, queries) {
    for(let i=0;i<queries.length;i++){
        let temp = arr[queries[i][0]];
        arr[queries[i][0]] = arr[queries[i][1]];
        arr[queries[i][1]] = temp;
    }
    return arr;
}
```

**✨개선코드**

- `구조분해할당` 배열이나 객체를 구조 분해해서 한 번에 변수에 대입할 수 있음

```jsx
function solution(arr, queries) {
    queries.forEach( ([a,b]) => {
        [arr[a],arr[b]] = [arr[b],arr[a]];
    })
    return arr;
}
```
---

### 수열과 구간 쿼리2

- 정수 배열 `arr` 2차원 정수 배열 `queries`
- 각 `query`마다 ~~

queries를 돌면서 조건에 맞는 배열을 반환

```jsx
function solution(arr, queries) {
    let result = [];
    let pp;
    queries.forEach((val,idx)=>{
        pp = -1;
        for(let i=val[0];i<=val[1];i++){
            if(arr[i] > val[2])
                if(pp===-1) pp = arr[i];
                else if(pp > arr[i]) pp = arr[i];
        }
        result.push(pp);
    })
    return result;
}
```

**✨개선코드**

- 2차원 배열에 `map` 적용 가능!! → `map(([s, e, k])`
- `.filter`
- `.sort`

```jsx
function solution(arr, queries) {
    return queries.map(([s, e, k]) => arr.slice(s, e + 1)
    .filter((n) => n > k).sort((a, b) => a - b)[0] || -1);
}

```

:::note
*2차원 배열 순회에 대한 내용은 다음편에..*
:::
