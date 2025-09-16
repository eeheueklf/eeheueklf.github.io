---
sidebar_position: 2
last_update:
  date: 9/16/2025
---

# 컴포넌트

컴포넌트는 React의 주요 개념 중 하나로, <mark>UI를 재사용 가능하도록</mark> 합니다. 컴포넌트는 자주 쓰이는 `button`, `header` 같은 UI 요소를 표현하거나, 복잡한 페이지를 구조화하기 위하여 쓰입니다. 컴포넌트는 `props`라고 하는 임의의 입력을 받고, [React Element](https://eeheueklf.github.io/docs/fe-study/React/basics#react-element)를 반환합니다.

HTML 태그처럼 컴포넌트를 작성하고 사용하여 전체 페이지를 디자인할 수 있습니다.
```jsx
<Layout title="𝙷𝚘𝚖𝚎">
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <HomeSidebar/>
        <main style={{ flex: 1, padding: '2rem' }}>
            <Content/>
        </main>
    </div>
</Layout>
```

## 컴포넌트 정의하기 

컴포넌트를 작성하는 일반적인 방법은 JavaScript 함수로 작성하는 것입니다. (함수 컴포넌트)

```jsx
export default function HomeSideBar() {
  return (
    <aside>
        <ol>
            <li>𝙷𝚘𝚖𝚎</li>
            <li>𝙳𝚘𝚌𝚜</li>
            <li>𝙱𝚕𝚘𝚐</li>
        </ol>
    </aside>
  );
};
```
1. `export default`로 컴포넌트를 다른 파일에서 사용 가능하도록 내보냄
2. 함수 정의하기 *이름은 반드시 대문자로 시작해야함
3. JSX 반환 : [JSX](https://eeheueklf.github.io/docs/fe-study/React/basics#jsx-%EA%B0%9C%EB%85%90)로 UI 구조 표현

두번째 방법은 클래스 컴포넌트를 작성하는 것입니다. 저는 써본적이 없는데, 특정 상황에서 사용된다고 합니다.
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

# 컴포넌트 사용하기

내보낸 컴포넌트는 다른 컴포넌트 안에서 중첩해 사용할 수 있습니다.
```jsx
import HomeSidebar from './HomeSidebar';

function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        <HomeSidebar/>
        <main>Contents</main>
    </div>
  );
}
```
브라우저에 렌더링되는 HTML은 다음과 같습니다.
```html
<div style={{ display: 'flex', minHeight: '100vh' }}>
    <aside>
        <ol>
            <li>𝙷𝚘𝚖𝚎</li>
            <li>𝙳𝚘𝚌𝚜</li>
            <li>𝙱𝚕𝚘𝚐</li>
        </ol>
    </aside>
    <main>Contents</main>
</div>
```

## 컴포넌트 합성
컴포넌트는 다른 컴포넌트를 포함할 수 있습니다.
```jsx
function App() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <MainContent />
    </Layout>
  );
}
```
React 컴포넌트는 태그 사이에 작성한 내용을 `props.childern`으로 전달합니다.  
`<Layout children={<Header /><Sidebar /><MainContent />}>`  
Layout 컴포넌트 내부에서 `props.children`을 출력하면 `children` 내용이 들어갑니다.

```jsx
function Layout({children}) {
  return (
    <div className="layout">
      <div className="content">{children}</div>
    </div>
  );
}
```

출처 
[`Components와 Props`](https://ko.legacy.reactjs.org/docs/components-and-props.html)