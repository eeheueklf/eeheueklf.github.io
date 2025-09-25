---
sidebar_position: 5
last_update:
  date: 9/25/2025
---

# Virtual DOM

## DOM

[브라우저 동작 과정 한눈에 보기✨](https://eeheueklf.github.io/docs/fe-study/internet/browser#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%83%90%EC%83%89-%EC%9D%B4%ED%9B%84)에서 브라우저는 서버로부터 받아온 HTML 문서를 한 글자씩 읽어 DOM(Document Object Model) 트리를 구성한다고 했습니다. 
이처럼 <mark>문서를 구성하는 요소들을 tree 형태로 표현한 것</mark>을 **DOM**이라고 합니다.

![alt text](../1-internet/img/dom.png)

## Virtual DOM
`가상 돔`

Virtual DOM은 실제 DOM을 직접 다루는 대신, 메모리 상에서 JavaScript 객체로 추상화한 DOM 트리입니다.

React의 뛰어난 성능을 가능하게 하는 핵심 중 하나가 바로 이 virtual DOM입니다.

- Virtual DOM은 실제 DOM의 구조와 데이터만 가볍게 복제한 JS 객체 트리입니다.
- 컴포넌트 렌더링이 발생하면 React는 Virtual DOM을 새로 생성합니다.
- `Diffing` 기존 Virtual DOM과 새 Virtual DOM의 차이를 탐색합니다 
- `Reconciliation` Diffing 결과를 실제 DOM에 반영합니다.


### 장점과 단점

실제 DOM을 직접 조작하는 것이 아닌 간접으로 조작하고 변화가 있는 부분만 변경하기 때문에 가볍고, 불필요한 연산(리플로우, 리페인팅)을 최소화 할 수 있습니다.

장점
1. 성능: 실제 DOM 조작을 최소화하여 효율적으로 렌더링
2. 선언적 UI: 상태(state)에 따라 UI가 자동으로 관리
3. 복잡한 UI 관리: 구조가 커져도 관리하기 쉬움
4. diffing: 변경이 필요한 부분만 갱신하여 효율적
5. 자동 batch 처리: 여러 변경을 묶어서 한 번에 처리하여 성능 최적화

단점
1. Virtual DOM을 유지하기 위한 추가 메모리 사용

## DOM 변경 감지

React에서는 다음과 같은 요인들이 Virtual DOM diff 과정을 일으킵니다.

| DOM 변경 요인        | 예시/설명                          |
|---------------------|-----------------------------------|
| state 변경          | setState, useState 등 호출 시      |
| props 변경          | 부모 컴포넌트에서 새로운 값 전달   |
| forceUpdate 호출    | 클래스 컴포넌트에서 명시적 갱신    |
| context 값 변경     | context provider의 value 변경      |
| 부모 트리 리렌더    | 부모로부터 렌더링 전파             |
| key 속성 변화       | 리스트에서 key 값 교체/삽입/삭제 시 |

최신 React(18+)에서는 **Concurrent Rendering**과 **Batching** 개념이 도입되어, 모든 업데이트가 즉시 실제 DOM에 반영되는 것이 아닌, React 스케줄러가 최적의 타이밍에 DOM 업데이트를 처리합니다.

## Virtual DOM이 없는 세계선
```js
document.getElementById("root").innerHTML = "<div>업데이트</div>";
element.appendChild(newNode);
element.removeChild(oldNode);
```
이런 식으로 직접 DOM을 조작하면, 리플로우(Reflow) / 리페인트(Repaint)가 매번 발생해 성능 저하가 발생합니다.


## 개발자가 접하는 virtual DOM
Virtual DOM 내부 로직을 직접 다루지는 않지만, 불필요한 렌더링을 막아주는 다음과 같은 방법을 사용하여 성능을 향상시킬 수 있습니다.

- useMemo, useCallback을 활용해 계산과 함수 메모이제이션하기
- key 속성: 리스트 컴포넌트에 고유 식별자 key를 꼭 넣기


---

헷갈렸던 부분 정리 (질문과 답)

Q. React는 렌더링을 할때마다 Virtual DOM을 생성한다❓ 
A. React는 렌더링이 필요한 상황마다 새로운 Virtual DOM 트리 전체를 생성한다.🙆‍♀️  

Q. 두 개의 Virtual DOM을 비교한다❓  
A. 기존 Virtual DOM과 새롭게 생성된 Virtual DOM을 비교하여 실제 DOM에 반영한다. 🙆 

Q. React에서는 state 변화가 발생하면 Virtual DOM이 생성된다❓  
A. React에서는 state 변화가 발생하면 virtual DOM diff 과정이 항상 일어난다. 단, 실제 DOM 반영 시점은 React 내부 스케줄러가 최적 타이밍에 결정한다. 🙆‍♂️

출처  
[`Virtual DOM이란`](https://parkjju.github.io/vue-TIL/daily/220223-virtualDom.html)  