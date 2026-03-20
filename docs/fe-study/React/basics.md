---
sidebar_position: 1
last_update:
  date: 9/15/2025
---

# JSX

## JSX 개념

JSX(JavaScript XML)은 JavaScript의 확장 문법으로 <mark>JavaScript 코드 안에서 UI 구조를 표현</mark>하기 위해 사용됩니다. 
React에서는 JSX를 사용하여 UI를 **선언적으로 작성**하여 Babel 같은 도구를 통해 JavaScript로 변환되어 브라우저에서 해석될 수 있습니다.

JS를 다뤄봤다면 알겠지만, JS로는 HTML 요소를 선택하고 하나하나 어떻게 만들고 넣을지 직접 명령해서 요소를 다뤄야합니다.
```js title="JS 방식 - 명령형"
const h1 = document.createElement('h1');
h1.textContent = 'Hello, World';
h1.className = 'title';
document.body.appendChild(h1);
```
```jsx title="JSX 방식 - 선언형"
const element = <h1 className="title">Hello, World</h1>;
```
JSX에서는 무엇을 보여줄지만 선언하면 React가 알아서 구조를 만들어주기 때문에 코드가 간결하고 가독성이 높습니다.

### React Element
React Element는 React가 UI를 화면에 그리기 위하여 사용하는 객체로 JSX는 내부적으로 React Element를 생성합니다.

```jsx title="JSX 코드"
const title = <h1>Hello, World</h1>;
```
```js title="JS로 변환된 코드"
const title = React.createElement('h1', null, 'Hello, World');
```
```js title="React Element"
{
  type: 'h1',        // HTML 태그 or 컴포넌트
  props: {            // 속성들
    children: 'Hello, World'
  },
  key: null           // 고유 키
}
```

## JSX 특징

### JavaScript 표현식 사용
  
JSX 안에서는 중괄호 `{}`를 사용하여 JavaScript 표현식을 삽입할 수 있습니다.

```jsx
const name = "world";
const title = <h1>Hello, {name}</h1>;
```

### 하나의 최상위 태그만 반환
React.createElement는 `React.createElement('h1', null, 'Hello, World')` 다음과 같은 구조로 생성되기 때문에 최상위 태그는 하나만 반환되어야 합니다.

```jsx
// Error : 부모 요소가 없음
return(
  <div className='ContentWrapper'>본문 공간</div>
  <div className='Footer'>Footer</div>
)

// O
return(
  <>
    <div className='ContentWrapper'>본문 공간</div>
    <div className='Footer'>Footer</div>
  <>
)
```

### 기타 문법
- 태그 작성: HTML 태그와 동일하게 사용됨
- 속성 `props`: camelCase 규칙 `className`, `htmlFor`
- 동적 렌더링: 조건부 `? :` 및 반복 `map()` 사용
- 스타일링: 인라인 스타일 객체 사용
- Fragment: 불필요한 DOM 요소 없이 여러 태그 그룹화 `<></>`


### 화면에 표시하는 과정

JSX로 작성한 코드는 브라우저가 이해할 수 없기 때문에, React가 여러 단계를 거쳐 화면에 표시합니다. `JSX 코드`는 Babel과 같은 도구를 통해 React가 이해할 수 있는 `React Element`로 변환됩니다. React는 React Element를 통해 `가상 DOM`에 요소를 구성하고, 기존 가상 DOM과 비교하여 변경된 부분만 `실제 DOM`에 업데이트합니다.


출처 
[`JSX 소개`](https://ko.legacy.reactjs.org/docs/introducing-jsx.html)