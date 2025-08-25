---
sidebar_position: 4

---

# 이차원 리스트 (Day 25)

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
**코딩 기초 트레이닝**, **코딩테스트 입문** 문제를 Day별로 풀고 정리한 내용입니다.
:::

:::warning
#### ✨Day 25

마지막 !!

**목표**:  이차원 리스트
    


- 배열 생성/초기화  
    `Array.from(arrayLike, mapFn)` ❇️ 배열 생성 | 유사 배열 객체로 배열 생성  
    `new Array(n).fill(0)` 길이가 n, 0으로 채운 배열 생성

- 배열 순회  
    `reduce` ✨ 하나의 누적된 값  
    `every` ✨ 모든 요소가 조건을 만족하면 true  
:::

---

볼만한 코드 문제들만 가져왔습니다.!

## 기초
### 정수를 나선형으로 배치하기

```jsx
function solution(n) {
    const answer = Array.from(Array(n), () => new Array(n).fill(0))
    let a=0,b=0;
    let dir = 'r';
    for(let i=0;i<n*n;i++){
        answer[a][b] = i+1;
        switch(dir){
            case 'r':
                if(b===n-1){dir = 'd'; a++;}
                else if(answer[a][b+1]){dir = 'd'; a++;}
                else{b++;}
                break;
            case 'd':
                if(a===n-1){dir = 'l'; b--;}
                else if(answer[a+1][b]){dir = 'l'; b--;}
                else{a++;}
                break;
            case 'l':
                if(b===0){dir = 'u'; a--;}
                else if(answer[a][b-1]){dir = 'u'; a--;}
                else{b--;}
                break;
            case 'u':
                if(a===0){dir = 'r'; b++;}
                else if(answer[a-1][b]){dir = 'r'; b++;}
                else{a--;}
                break;
        }
    }
    return answer
}
```
🍞 right, down, left, up 경우 마다 조건식으로 끝인지 판별 후 방향 설정

```jsx
function solution(n) {
    const move = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const answer = Array.from(new Array(n), () => new Array(n).fill(0))
    let x = 0, y = 0, dir = 0, num = 1;
    while(num <= n * n) {
        answer[x][y] = num;
        let nextX = x + move[dir][0];
        let nextY = y + move[dir][1];
        if (nextX >= n || nextX < 0 
        || nextY >= n || nextY < 0 
        || answer[nextX][nextY] !== 0) {
            dir = (dir + 1) % 4;
            nextX = x + move[dir][0];
            nextY = y + move[dir][1];
        }
        x = nextX;
        y = nextY;
        num ++;
    }
    return answer;
}
```
🍞 `move`로 방향 설정 -> `dir = (dir + 1) % 4`로 방향 전환  
🍞 범위를 벗어나거나 이미 채워진 칸이라면 방향 전환


---

### 특별한 이차원 배열 2

```jsx
function solution(arr) {
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[i][j]!==arr[j][i]) return 0;
        }
    }
    return 1;
}
```

🍞 `for`문으로 각 원소가 조건을 만족하는지 확인

```jsx
function solution(arr) {
    return arr.every((r, i) => r.every((_, j) => arr[i][j] === arr[j][i])) ? 1 : 0;
}
```
🍞 `every`로 배열 순회하면서 모든 원소가 조건을 만족하는지 확인

---

### 정사각형으로 만들기

```jsx
function solution(arr) {
    let stan = arr.length;
    arr.forEach((v)=> v.length>stan ? stan=v.length : stan);
    while(arr.length<stan){
        arr.push(Array(stan).fill(0));
    }
    arr.forEach((v)=>{
        while(v.length<stan){
            v.push(0);
        }
    })
    return arr
}

```
🍞 정사각형으로 만들 기준 길이 stan 설정  
🍞 만약 배열 길이가 stan보다 짧다면 행 추가  
🍞 각 열이 stan보다 짧다면 열 추가

---

### 이차원 배열 대각선 순회하기

```jsx
function solution(board, k) {
    return board.map((v,i) => {
        return v.map((v,j)=>{
            return i+j>k ? 0 : v;
        }).reduce((acc,cur)=>acc+cur,0)
    }).reduce((acc,cur)=>acc+cur,0)
}
```
🍞 `v.map` 돌면서 조건 만족하는 요소 반환 후 합산  
🍞 전체 요소 합산

```jsx
function solution(board, k) {
  return board.reduce((total, row, i) => total + 
    row.reduce((prev, num, j) => (i + j <= k ? prev + num : prev), 0),
    0,);
}
```
🍞 `total` 지금까지의 합 `row` 각 행 `i` 행 인덱스  
🍞 각 행을 돌면서 조건에 맞는 원소 합산

---

## 입문

### 문자열 밀기

```jsx
function solution(A, B) {
    let i=0;
    while(i<A.length){
        if(A === B)
            return i;
        A = A[A.length-1] + A.slice(0,A.length-1);
        i++;
    }
    return -1;
}
```
🍞 `slice`로 문자열 하나씩 밀기 구현

```jsx
let solution(a,b){
	return (b+b).indexOf(a)
}

```
🍞 `흠시멘..` 문자열문자열로 indexOf로 구함!

---

### 연속된 수의 합

```jsx
function solution(num, total) {
    return num %2 
        ? Array.from(Array(num), (_,idx) => idx+total/num-(num-1)/2) 
        : Array.from(Array(num), (_,idx) => idx+Math.floor(total/num)-num/2+1)
}
```

🍞 num이 홀수인 경우는 `3,12=>[3,4,5]` 정가운데 4*3로 계산가능함  
🍞 num이 짝수인 경우는 `4,14=>[2,3,4,5]` 정가운데 3.5*4로 계산가능함  
🍞 `Array.from(arrayLike, mapFn)` 배열 객체로 배열 생성  

```jsx
function solution(num, total) {
    var min = Math.ceil(total/num - Math.floor(num/2));
    var max = Math.floor(total/num + Math.floor(num/2));

    return new Array(max-min+1).fill(0).map((el,i)=>{return i+min;});
}
```
🍞 min과 max를 계산~


---

### 다음에 올 숫자

```jsx
function solution(c) {
    return c[2]-c[1] === c[1]-c[0] 
        ? c[c.length-1]+c[1]-c[0]
        : c[c.length-1] * c[1] / c[0]
}
```
🍞 등차/등비인지 확인 후 조건에 맞게~