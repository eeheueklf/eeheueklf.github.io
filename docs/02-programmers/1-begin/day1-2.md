---
sidebar_position: 2
---

# Day 1-2 | 문자열 배열 대소문자

:::note
[프로그래머스] <mark>일일 도전 과제 문제 풀이 정리</mark>입니다.  
관련 개념도 첨부하였으니 필요한 분들은 참고하세요.  
**코딩 기초 트레이닝**, **코딩테스트 입문** 문제를 Day별로 풀고 정리한 내용입니다.
:::

:::warning
#### ✨Day 1-2
**목표**: JS 기초 문법 익히기  
JS가 C++이나 Java와는 구조가 조금 달라서 **Day 1-2**에서는 **JS 기초 문법** 정도만 익혀도 충분합니다.  
(입출력, 문자열, 배열)


- 문자열 치환/변환  
    `.toUpperCase` 🔄 문자열을 대문자로 변환  
    `.toLowerCase` 🔄 문자열을 소문자로 변환  

- 문자열 / 배열  
    `split('')`  💜 문자열을 배열로  
    `join`  💚 배열을 문자열로  
:::

---
    
## 기초

### 대소문자 바꿔서 출력하기

- **문제**: 문자열 `str`의 대소문자를 바꿔서 출력  
- **주의**: 자바스크립트에서 문자열은 변경 불가능(immutable)한 값  
  → `str[i] = 'a'` 같이 직접 수정 불가능

```jsx
str[i] = str[i].toLowerCase(); // ❌ 불가능
```

**해결방법**

새로운 문자열 result를 만들고, 대/소문자를 바꾼 문자를 하나씩 추가

```jsx
str = input[0];
let result = '';
for(let i=0;i<str.length;i++)
    if(str[i] === str[i].toUpperCase()){
        result += str[i].toLowerCase();
    }
    else {
        result += str[i].toUpperCase();
    }
console.log(result)
```
**✨개선코드**
- `split('')` 구분자를 기준으로 문자열을 분리하여 배열로 반환
- `join('')` 구분자를 기준으로 배열의 요소를 문자열로 만들어 반환

```jsx
str = input[0].split(''); //str을 배열로 바꾸기
str.forEach((value, index) => {
    if (value === value.toUpperCase()) {
        str[index] = value.toLowerCase();
    } else {
        str[index] = value.toUpperCase();
    }
});
console.log(str.join('')); //str을 문자열로 바꾸기
```

---

## 입문

### 배열 두배만들기

- 문제: 배열의 각 원소를 2배로 만든 결과 반환
- 배열은 변경 가능하므로 반복문을 사용해 직접 수정 가능
```jsx
function solution(numbers) {
    var answer = [];
    numbers.forEach((value,index)=>
        answer[index] = value*2
    )
    return answer;
}
```
:::note
*forEach에 대한 자세한 설명은 다음 편에서 다룹니다.*
:::
