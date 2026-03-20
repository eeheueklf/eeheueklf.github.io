---
sidebar_position: 1
last_update:
  date: 8/22/2025
---

# 자바스크립트 기초


:::note
프론트엔드 중요 개념 - <mark>Javascript 내용 정리 1편</mark>입니다.
웹 사이트의 복잡한 동작들을 구현할 수 있는 JavaScript의 기본 개념부터 변수, 이벤트, 객체까지 다뤄봤습니다.
:::


## JavaScript는 무엇인가?

자바스크립트(JavaScript, JS)는 웹페이지를 구성하는 언어로, <mark>사용자와 상호작용할 수 있게 하는 프로그래밍 언어</mark>입니다. ('자바'스크립트이지만, 자바와는 관련이 없습니다..)  
HTML만이 적용된 정적인 웹페이지는 **내용과 구조**만 보여줄 수 있지만, JS를 사용한다면 다양한 기능을 구현할 수 있습니다.

- 버튼 클릭 → 내용변경
- 폼 입력 → 검증
- 동적 콘텐츠 생성
- 비동기 통신
- 브라우저 API 활용
- 애니메이션 & 효과
- 경고창, 확인창, 입력창
- 2D/3D 그래픽

즉 HTML이 뼈, CSS가 살, JS는 움직임을 담당합니다. 
뿐만아니라 JS 위에서 동작하는 많은 **라이브러리와 프레임워크**를 활용하면 복잡한 기능도 편리하게 구현할 수 있습니다. 

## 변수 (Variables)

변수는 데이터를 저장하는 상자입니다.
JS에서는 `var`, `let`, `const` 키워드를 사용하여 변수를 선언합니다.
타 언어에서는 `int`, `char` 등으로 변수의 타입을 미리 지정하지만, JS는 변수의 타입이 유동적이라는 특징을 갖고 있습니다.

```js
var data1;
let data2;
const data3 = 1;
```

- `var`  
  전역 범위 (단, 함수 내에서 선언되면 함수 범위)   
  업데이트/재선언 가능  
  호이스팅(선언이 맨 위로, 초기값은 `undefined`)
  
- `let`  
  선언된 블록 내에서만 사용 가능  
  업데이트 가능, 재선언 불가능  
  호이스팅되지만 초기화 안됨
- `const`
  상수 값 유지   
  선언된 블록 내에서만 사용 가능    
  업데이트/재선언 불가 (단, 객체 속성은 변경 가능)  
  선언시 반드시 초기화 필요

<br/>

:::tip
<mark>JS에서 `var`이 `let`으로 대체되는 추세이기 때문에, `var`을 사용할 일은 거의 없습니다.</mark>  
따라서 **상수, 객체/배열 => const**, **값이 바뀌는 변수 => let**만 기억하면 됩니다.  
코드 짤때는 `const`를 기본으로 쓰고, 변수 값이 바뀔때만 `let`으로 바꾸면 좋습니다.
:::

<br/>

변수에 담을 수 있는 값의 종류
- String (문자열) : `Hello`
- Number (숫자) : `10` `141.325`
- Boolean (참/거짓) : `true` `false`
- Array (배열) : `[1, 2, 3]` `["고양이", "강아지", "노루"]`
- Object (객체) : `{name: "고양이", age: 4}`


## 이벤트 (Events)

JS를 통해 사용자의 행동에 따른 동작을 설정할 수 있습니다.  
예시) `클릭`시 메시지 띄우기
```js
document.querySelector("html").onclick = function () {
  alert("클릭했습니다");
};
```
주요 이벤트 종류:
- `click`: 클릭 시
- `mouseover`: 마우스를 올렸을 때
- `keydown` / `keyup`: 키보드 입력
- `submit`: 폼 제출
- `scroll`: 스크롤
- `load`: 페이지 로드 완료
- `input`: 입력값 변경


## 객체
객체는 **관련된 데이터와 함수의 집합**입니다.
자바스크립트에서는 모든 것이 객체라고 할 만큼 자주 쓰이는 개념입니다.

```js
const cat = {
  name: "고양이",
  age: 1,
  sayAge: function () {
    console.log(this.name + ' 나이는 ' + this.age + '살 이다');
  },
};

cat.sayAge(); // 고양이 나이는 1살이다.
```
- `object` - 객체 (cat)
- `property` – 객체 안의 데이터 (name, age)
- `method` – 객체 안의 함수 (sayAge)

<br/>

다음과 같이 객체 배열로 사용할 수 있습니다.
```js
const animals = [
  { name: "노루", age: 4 },
  { name: "고양이", age: 1 },
  { name: "마루", age: 5 },
];

animals.forEach((animal) => {
  console.log(`${animal.name}는 ${animal.age}살이다.`);
});
```

---


출처 
[`JavaScript 기본`](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity)
[`JavaScript에 발 담그기`](https://developer.mozilla.org/ko/docs/Learn_web_development/Core/Scripting/A_first_splash)