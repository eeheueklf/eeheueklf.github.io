---
sidebar_position: 7
last_update:
  date: 10/3/2025
---

# useEffect

## 들어가며..


React에서 가장 많이 사용되는 Hook 중 하나인 `useEffect`! React 컴포넌트 렌더링 과정과 함께 알아봅시다.

useEffect는 컴포넌트가 렌더링 될 때 특정 작업을 수행할 수 있는 Hook입니다.

- 컴포넌트가 mount 될 때
- 컴포넌트가 update 될 때
- 컴포넌트가 unmount 될 때

기존 클래스형 컴포넌트에서 사용할 수 있었던 생명주기 메소드를 함수형 컴포넌트에서 사용할 수 있도록 합니다.

## 기본 흐름

React 함수 컴포넌트은 호출될때마다 렌더링이 일어납니다. useEffect는 <mark>렌더링 직후 실행되는 사이드 이펙트 관리 도구</mark>의 역할을 합니다.

컴포넌트 라이프사이클
1. `mount`
- 컴포넌트 함수 호출 -> virtual DOM 생성
- 렌더링 완료 후 브라우저 DOM 반영
- `useEffect`의 콜백 실행
2. `update`
- state나 props 변경 -> 컴포넌트 함수 재호출 -> virtual DOM 재생성 및 diff
- DOM 갱신
- 이전 effect의 cleanup 함수 실행
- 새로운 effect 실행
3. `unmount`
- 마지막 cleanup 함수 실행

### 세부 실행 순서
렌더링은 부모 -> 자식 순서로 진행됩니다.
virtual DOM 생성이 끝나고 실제 DOM에 반영되면 useEffect가 실행됩니다.
따라서 DOM을 기반으로 하는 작업(네트워크 요청, 이벤트 등록 등)을 안전하게 수행 가능


### cleanup 함수
useEffect는 콜백에서 함수를 반환할 수 있습니다.

cleanup 함수라고 불리는 useEffect 콜백 함수는
다음 effect 실행 직전과 컴포넌트가 언마운트될 때도 마지막으로 호출되며 주로 이벤트 리스너 제거, 타이머 해제, 구독 종료 같은 작업에 사용됩니다.

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('타이머 세는중'), 1000);

  // cleanup
  return () => clearInterval(timer);
}, []);
```

## async 함수와의 관계
useEffect 콜백 자체를 async로 만들 수는 없습니다. React는 반환값을 cleanup 함수로 기대하기 때문에 Promise를 반환하는 async함수는 다음과 같이 처리해야합니다.

```jsx
useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/data");
    const json = await res.json();
    console.log(json);
  }
  fetchData();
}, []);
```
useEffect 내부에 비동기 함수를 따로 선언하고 호출해야 한다.


## 결론

useEffect는 렌더링 이후 실행되는 사이드 이펙트 관리 도구입니다. `useEffect(func, deps)` deps 배열을 통해 effect 실행 시점을 자유롭게 조절할 수 있습니다.