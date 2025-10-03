---
sidebar_position: 6
last_update:
  date: 9/30/2025
---

# 컴포넌트 생명주기

## 들어가며..

리액트에서 컴포넌트는 생성 → 사용 → 소멸의 흐름을 가집니다. 화면에 나타나고, 업데이트 되고, 필요가 없어지면 사라지는 과정입니다.

함수 컴포넌트는 호출될 때마다 **렌더링**(rendering)이 일어나고, 화면에서 더 이상 필요 없을 때 **언마운트(unmount)** 됩니다.  

과거에는 클래스형 컴포넌트에서 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 같은 생명주기 메서드를 사용했지만, 현재는 함수형 컴포넌트에서 `useEffect`를 활용하는 것으로 대체할 수 있습니다.

```jsx
// 클래스형
class MyComponent extends React.Component {
  componentDidMount() { ... }
  componentDidUpdate() { ... }
  componentWillUnmount() { ... }
}

// 함수형
function MyComponent() {
  useEffect(() => {
    // 마운트 시 실행
    return () => {
      // 언마운트 시 실행
    };
  }, []);
}
```

## 생명주기 단계
리액트 컴포넌트의 생명주기는 크게 세 가지 단계로 이루어집니다.

1. **mount 마운트**
- 컴포넌트가 처음 화면에 나타날 때 발생
2. update
- props나 state가 바뀌었을때
- 부모 컴포넌트가 리렌더링 될 때
3. unmount 언마운트
- 컴포넌트가 화면에서 사라질 때


:::tip
### Render vs Update
Render : 컴포넌트가 처음 화면에 그려지는 과정  
Re-render : 컴포넌트를 다시 그리는 과정

동작 순서  
re-render → 함수 호출 → virtual DOM 재계산 → 화면 반영 → useEffect 실행
:::

## useEffect로 생명주기 다루기
useEffect를 통해 함수형 컴포넌트에서도 컴포넌트 생명주기를 다룰 수 있습니다.

```jsx
useEffect(func, deps)
```
1. deps에 [] (빈 배열)
- mount시 한 번만 실행

2. deps에 특정 값
- mount + 해당 값 변경 시 실행

3. deps가 없을때
- render 될때마다 실행

*clenup 함수를 사용하면 언마운트 시점과 업데이트 전 정리 작업을 제어할 수 있습니다.
