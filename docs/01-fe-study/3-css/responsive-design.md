---
sidebar_position: 3
toc_max_heading_level: 4
---

# 반응형 디자인 가이드

## 반응형 디자인이란?

반응형 웹 디자인은 웹 페이지가 <mark>모든 화면 크기와 해상도에서 사용성을 보장</mark>하도록 하는 웹 디자인 접근 방식입니다. 기본적으로는 스타일 적용 없이 `HTML`만 포함된 웹 페이지도 반응형입니다. 


### 미디어 쿼리

CSS에서 제공하는 `@media`를 통해 화면 크기, 해상도에 따라 선택적으로 다른 스타일을 적용할 수 있습니다.


```css
/* 모바일 */
body {
  font-size: 16px;
}

/* 태블릿 (세로) */
@media (min-width: 768px) {
  body {
    font-size: 18px;
}

/* 태블릿 (가로) */
@media (min-width: 992px) {
    body {
    font-size: 18px;
}

/* 데스크탑 */
@media (min-width: 1024px) {
  body {
    font-size: 20px;
}
```

예시와 같이 일반적으로는 <mark>모바일 기준으로 구현</mark>하는 모바일 우선 접근을 권장합니다. 모바일 화면 구현을 위해 **간단한 단일 레이아웃**을 만든 다음, 태블릿 -> 데스크탑 순으로 추가하는 방식입니다. 이렇게 작은 화면부터 스타일링을 시작하면 성능과 유지보수가 용이해집니다.

<br/>
이 블로그는 [`docusaurus`](https://docusaurus.io/ko/docs/blog)를 테마로 하는 블로그인데요, 이 블로그에 적용된 반응형 디자인을 살펴봤습니다: 모바일에서는 사이드바가 표시되지 않도록 되어있네요! 모바일 화면은 F12 - toggle divice toolbar를 통해 확인할 수 있습니다.
```css
@media (max-width: 996px) {
  .sidebar {
    display: none;
  }
}
@media (min-width: 997px) {
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: var(--ifm-navbar-height);
    width: var(--doc-sidebar-width);
  }
}
```

## 반응형 레이아웃 기술

반응형 디자인을 구현하기 위해서는 단순히 화면 크기에 따라 스타일을 바꾸는 것이 아닌, <mark>그리드, 이미지, 폰트, 레이아웃</mark>을 유연하게 설계하는 것이 중요합니다.

### 유연한 그리드

```css
/* 잘못된 예시 */
div {
  width: 1200px;
}

/* 올바른 예시 */
div {
  width: 100%;
  max-width: 1200px;
}
```

- 그리드를 상대 단위`(%, vw, em, rem)`로 구성
- 화면 크기에 따라 레이아웃이 유동적으로 조정됨
- 고정 폭`(px)`은 화면 크기에 따라 레이아웃 깨질 수 있음

<mark>반응형 레이아웃은 px단위의 고정된 크기보다는, 기기 크기에 따른 상대적인 크기를 사용합니다.</mark>


### 유동적인 이미지

```css
img {
  max-width: 100%;
  height: auto;
}
```

- 이미지가 화면 폭을 넘지 않도록 설계
- 다양한 해상도의 화면에서 올바르게 표시
- 다양한 해상도의 화면에서 올바르게 표시


### 유연한 폰트, 이미지 크기

- 폰트도 상대 단위 사용 `em` `rem`
- 모바일에서 고해상도 이미지를 그대로 사용 XX 
- srcset 속성을 사용해 디바이스 해상도에 맞는 이미지 제공


```html
<img 
  src="image-480w.jpg" 
  srcset="image-480w.jpg 480w, image-800w.jpg 800w, image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
/>
```

### 레이아웃 시스템

- `Flexbox` : 1차원 레이아웃
- `Grid` : 2차원 레이아웃

<br/>


:::warning
반응형 디자인은 스타일을 화면 크기에 맞추는 것에서 사용자 경험(UX)와 SEO 까지 고려하는 중요한 설계 방식입니다.
- 모바일 우선 접근으로 시작
- 유연한 그리드와 이미지 사용
- 적절한 미디어 쿼리와 터치 친화적인 UI를 적용  
:::