---
sidebar_position: 3
last_update:
  date: 9/18/2025
---

# React Hook

React의 상태관리의 핵심, **리액트 Hook**에 관해 알아봅시다.

Hook은 React v16.8에서 도입된 기능으로 기존의 Class 컴포넌트에서만 가능하던 상태관리와 생명주기 로직을 함수형 컴포넌트에서도 사용할 수 있도록 개선한 도구입니다. 

저도 그렇고 요즘 React를 시작하신 분들은 대부분 Hook으로만 상태관리를 해왔을겁니다. 그래서 Class는 Hook의 탄생 비화를 알기 위한 배경지식 정도로 알면 좋을 것 같습니다.

## Hook이 만들어진 이유

Class 기반의 React에는 몇 가지 한계가 있습니다.

- 상태 관련 로직을 재사용하기 어려움
- 코드가 복잡해지면서 가독성이 떨어짐
- `this` 등 헷갈리는 부분이 많음

이런 점들을 개선하는 목적으로 Hook이 만들어졌다고 합니다.

## 자주쓰는 Hook들

:::warning
`useState` : 상태 관리  
`useEffect` : 사이드 이펙트 관리  
`useContext` : 전역 상태 쉽게 사용  
`useMemo` : 연산 최적화  
`useRef` : DOM/값 참조 유지  
`useCallback` : 함수 최적화  
:::

### useState

```jsx
const [value, setValue] = useState(0);
// value : 상태값, setValue : 값 변경
```

`useState`는 컴포넌트 내부에서 상태(state)를 관리하기 위해 사용합니다.

```jsx
let value = 0;
```
일반적으로 js에서는 변수를 `let`으로 선언해서 값만 바꾸면 되지만, React에서는 변수의 값이 바뀌었을때 UI가 자동으로 업데이트되지 않습니다.

`useState`를 사용하면 React가 상태를 추적하고, 상태가 바뀔 때 해당 컴포넌트를 다시 렌더링하여 UI를 최신 상태와 동기화합니다.


### useEffect

```jsx
useEffect(() => {
  console.log("렌더링 후 실행");
});
```
`useEffect`는 컴포넌트가 렌더링 될때마다 특정 작업을 수행하도록 하는 hook입니다.

다음과 같이 사용할 수 있습니다.

- `useEffect(()=>{})`  
  렌더링이 일어날 때마다 실행  
- `useEffect(()=>{}, [])`  
  마운트 될 때 한 번만 실행(*초기 DOM 빌드)   
- `useEffect(()=>{}, [value])`  
  특정값이 변경될 때만 실행  

### useContext

`useContext`는 `Context API`를 쉽게 활용할 수 있게 하는 Hook입니다.

부모에서 자식으로 `props`를 넘기지 않고, 부모에서 전역으로 공유되는 값을 설정하면 필요한 자식에서 사용할 수 있게 합니다.

### useMemo

```jsx
const result = useMemo(() => CalcuResult(num), [num]);
```
`useMemo`는 비싼 연산 결과를 저장(**메모이제이션**)하여, 동일한 입력이 다시 발생했을때 이전에 저장된 값을 반환하여 불필요한 재계산을 줄입니다.

### useRef

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />;
```
`useRef`는 두 가지 용도로 자주 쓰입니다.

1. DOM 요소 접근 
2. 렌더링과 상관없이 유지할 값 보관

### useCallback
```jsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```
React에서는 컴포넌트가 리렌더링 될 때마다 함수가 새로 생성됩니다.  
`useCallback`을 쓰면 의존성이 변하지 않는 한 같은 함수 인스턴스를 재사용할 수 있습니다. (**함수를 메모이제이션**)  
주로 자식 컴포넌트에 `props`로 함수를 넘길 때 불필요한 리렌더링을 막는 용도로 사용합니다.

---

기타 Hook들은 제가 배움이 깊어지는 대로 추가해보겠습니다..!
(`useReducer`, `useLayoutEffect`, `useImperativeHandle` ... )