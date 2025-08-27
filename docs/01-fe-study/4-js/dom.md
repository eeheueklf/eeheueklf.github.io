---
sidebar_position: 2
toc_max_heading_level: 4
---

# DOM 조작 : 바닐라 JS vs React


:::note
프론트엔드 중요 개념 - <mark>Javascript 내용 정리 2편</mark>입니다. 
:::

## DOM의 개념

![DOM Tree](./img/dom.png)

DOM(Document Object Model)은 웹 페이지를 프로그래밍 언어가 이해할 수 있는 구조로 만든 인터페이스입니다. 자바스크립트는 DOM을 통해 웹 페이지의 내용, 구조, 스타일을 변경할 수 있습니다. DOM은 트리구조로 이루어져있으며, HTML 문서의 각 태그는 노드라는 개별 단위로 표현됩니다.
 
UI를 업데이트 하고 사용자와 상호작용 하기 위해서는 DOM 조작이 필수적이기에 프론트엔드 개발에서 DOM 조작 개념은 중요하다고 볼 수 있습니다.

---

## 바닐라 JS에서의 DOM 조작

요즘 대부분의 프로젝트에서 React, Vue, Next를 쓰지만, DOM 사용 기본기를 쌓는 측면에서 알아두면 좋을 바닐라 JS의 DOM 조작 내용입니다. 참고 : [브라우저 동작과정 - DOM 구축](https://eeheueklf.github.io/docs/fe-study/internet/browser#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%83%90%EC%83%89-%EC%9D%B4%ED%9B%84)


브라우저가 HTML 문서를 읽고 화면에 띄우기 위한 렌더링 과정을 알아야합니다. 바닐라 JS에서 일어나는 렌더링 흐름은 `DOM` → `CSSOM` → `Render Tree` → `Layout` → `Paint`으로 이루집니다. 바닐라 JS에서는 DOM 요소에 직접 접근하여 조작합니다. → 브라우저 엔진이 즉사 반응하면서 `Reflow`/`Repaint`가 발생합니다.

:::warning
### 주요 DOM 조작 방법
- 생성 CREATE  
    `createElement` ❇️ 새로운 HTML 요소 생성  
    `createTextNode` ❇️ 새로운 텍스트 노드 생성

- 읽기/선택 READ  
    `querySelector` 🔍 CSS 선택자와 일치하는 첫 번째 요소  
    `querySelectorAll` 🔍 CSS 선택자와 일치하는 모든 요소  
    `getElementById` 🔍 특정 ID를 가진 요소  
    `getElementByClassName` 🔍 특정 className을 가진 요소

- 수정 UPDATE  
    `textContent` ✨ 요소의 텍스트 콘텐츠 변경  
    `innerHTML` ✨ 요소 내부의 HTML 콘텐츠 변경  
    `classList.add` ✨ 요소에 새로운 클래스 추가  
    `setAttribute` ✨ 요소의 속성 값 설정  

- 삭제 DELETE  
    `remove` 💚 요소를 DOM 트리에서 삭제  
    `removeChild` 💚 부모 요소에서 특정 자식 요소를 제거 

- 추가 APPEND  
    `appendChild` 💚 부모 요소에 자식 요소를 추가  
    `append` 💚 부모 요소에 여러 자식 요소를 추가  
:::


---

## React에서 DOM 조작

React는 바닐라 JS처럼 DOM을 직접 건드리지 않습니다. 대신 가상 DOM(Virtual DOM) 이라는 개념을 통해 효율적으로 관리합니다.
상태(state) 기반으로 UI를 선언적으로 조작

`className`, `style={{}}`, `onClick` 같은 JSX 속성으로 처리

```jsx
function App() {
  const [active, setActive] = React.useState(false);

  return (
    <button 
      className={active ? "btn active" : "btn"}
      style={{ color: active ? "red" : "black" }}
      onClick={() => setActive(!active)}
    >
      클릭
    </button>
  );
}
```
`className` → 조건부 클래스 적용

`style={{}}` → 객체 형태로 스타일 제어

`onClick → JSX` 속성으로 이벤트 처리

렌더링 과정: 상태 변경 → Virtual DOM diff → 필요한 부분만 실제 DOM 업데이트


---


### 📝 DOM 조작 & 렌더링 비교

| 구분             | 바닐라 JS                             | React                                |
| -------------- | ---------------------------------- | ------------------------------------ |
| **DOM 선택**     | `document.querySelector('.btn')`   | JSX에서 요소 관리 |
| **클래스 제어**     | `el.classList.add('active')`       | `className={조건 ? "on" : ""}`         |
| **스타일 제어**     | `el.style.color = "red"`           | `style={{ color: "red" }}`  |
| **이벤트**        | `el.addEventListener("click", fn)` | `<button onClick={fn}>`              |
| **렌더링 흐름**     | DOM 직접 수정 → Reflow/Repaint 발생      | Virtual DOM → Diffing → 필요한 부분만 업데이트 |
| **성능 최적화 포인트** | DOM 접근 최소화, classList 위주           | 상태 관리, 불필요한 리렌더 방지                   |

