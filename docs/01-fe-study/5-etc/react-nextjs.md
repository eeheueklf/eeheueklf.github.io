---
sidebar_position: 3
toc_max_heading_level: 4
last_update:
  date: 9/11/2025
---

# React vs Next.js


## React란?

처음 웹을 만들때는 HTML이나 JSP로 화면을 만들었습니다. HTML+JS 방식은 HTML로 정적 화면을 만들고 JS로 DOM을 조작하는 방식으로 이루어졌습니다.

```html
<div id="root"></div>
<script>
  document.getElementById('root').innerHTML = '<h1>Hello</h1>';
</script>
```

React는 각 요소를 컴포넌트화하고, 이 컴포넌트들의 조합으로 UI를 구성하여 웹을 표현하는 라이브러리입니다.
또한 상태가 바뀌면 React가 필요한 부분을 자동으로 리렌더링합니다

```jsx
function App() {
  return <h1>Hello</h1>;
}
```
```jsx
function Header() {
  return <header>헤더 영역</header>;
}

function Footer() {
  return <footer>푸터 영역</footer>;
}

function App() {
  return (
    <div>
      <Header />
      <main>메인 콘텐츠</main>
      <Footer />
    </div>
  );
}
```
Header, Footer, App 각각이 컴포넌트이고, App에서 Header와 Footer를 가져와 화면을 구성하고 있습니다.


React의 특징
- 화면을 컴포넌트 단위로 나눠서 그려줌 -> 생산성/재사용성
- 단일 페이지 어플리케이션 `SPA` 제작에 좋음
- 라우팅, SSR(서버 사이드 렌더링), 데이터 패킹은 기본 제공 안함
- 빌드될때 `React.createElement(...)` 형태로 변환 
- virtual DOM 사용으로 빠른 UI 업데이트 가능


## Next.js

Next.js는 React 기반 풀스택 프레임워크입니다. React로 만든 화면을 실제 서비스에 맞게 업그레이드 할 수 있으며, 현재 [React](https://react.dev/learn/creating-a-react-app#nextjs-pages-router) 공식 문서에서 가장 먼저 소개하고 있습니다.

Next.js의 특징
- **라우팅 내장** : (폴더 구조 기반) => 하위 page.tsx가 URL과 연결됨
- **SSR 서버사이드 렌더링** : SEO, 초기 속도 최적화
- Vercel에서 간단하게 배포 할 수 있음

<br/>

그래서 제목은 React vs Next.js이지만..  
react ↔ vue.js (UI 제공)  
next.js ↔ nuxt.js (풀스택 프레임워크)  
로 대응되는 개념입니다.

## 코드 상의 차이

React 컴포넌트는 이렇게 작성합니다.  
React에서는 react-router-dom 설치해서 라우팅을 직접 세팅해야 합니다.
```jsx
function Hello() {
  return <h1>Hello World</h1>;
}
export default Hello;
```

Next.js는 라우팅이 자동으로 됩니다.
```
app/
  page.tsx
  profile/ page.tsx
```

그 이상의 별다른 코드 상의 차이는 없는 것 같습니다.

## 풀스택 개발
React만 사용할 경우 서버 api를 따로 만들어서 fetch 등으로 연결해야하지만, Next.js는 프로젝트 안 app/api 폴더에 파일을 두면 API 서버처럼 동작한다고 합니다. 저도 따로 백엔드 작업할때 spring 사용했었는데, JavaScript로도 백엔드를 개발할 수 있다는 것입니다. (기존에 node.js와 비슷)


## 렌더링 방식

React는 Client-Side Rendering **CSR**, Next.js는 Server-Side Render **SSR** 이라는 큰 차이가 있습니다.

- Client-Side Rendering `CSR` : 브라우저가 화면을 그리는 방식. 필요한 데이터를 API로 가져와서 HTML을 만들어 보여주기 때문에 첫 화면 로딩 속도가 느리고, 검색엔진이 읽기 어려워 SEO(검색엔진 최적화)에 불리합니다.
- Server-Side Render `SSR` : 서버에서 완성된 HTML을 브라우저에 전달하는 방식. 첫 화면 로딩 속도가 빠르고, 검색엔진이 HTML을 읽을 수 있어 SEO에 유리합니다.

이처럼 SSR 방식은 기존에 프론트엔드에서 하던 상태 관리나 등이 서버의 역할로 넘어가다보니,, SSR 방식에서는 풀스택으로 가야할 것 같기도 합니다.

```jsx
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <ul>
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```


```tsx
export default async function Posts() {
  const res = await fetch("/posts");
  const posts = await res.json();
  return (
    <ul>
      {posts.slice(0, 5).map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

CSR 방식에서는 UseEffect를 사용하여 API 요청을 보내고 state에 저장 후 렌더링하지만, SSR 방식에서는 컴포넌트 자체가 async function으로 동작하며 서버에서 데이터를 가져와 HTML을 생성합니다.


