---
sidebar_position: 2
toc_max_heading_level: 4
---

# CSS Layout 가이드


## 3.2. Making Layouts

### CSS 레이아웃

CSS에는 페이지의 전체적인 구조부터 세부적인 요소까지 구성할 수 있는 다양한 레이아웃 기법이 있습니다. 가장 기본적인 일반 흐름부터 Flexbox, Grid, Position 같은 최신 방법까지 알아봅시다.


주요 레이아웃 기법
- 일반 흐름
- display
- Flexbox
- Grid
- Float
- Position
- table

---

### 일반 흐름

일반 흐름은 CSS로 별도 레이아웃을 적용하지 않았을때 브라우저가 HTML 요소들를 기본적으로 배치하는 방식입니다. 

<mark>배치 방식</mark>
- 블록 요소 `block` : 새로운 줄에서 시작하고, 가로 전체 너비를 차지  
    `<div>`, `<p>`, `<h1>` 등의 태그  
    width, height, margin, padding 지정 가능
- 인라인 요소 `inline` : 한 줄 안에서 나란히 배치되고, 컨텐츠 크기만큼만 차지   
    `<span>`, `<a>`, `<img>` 등의 태그  
    width, height 지정 불가능

즉, 기본적으로 `<div>`, `<p>`, `<h1>`같은 요소들은 위에서 아래로, `<span>`, `<a>`, `<img>`은 왼쪽에서 오른쪽으로 배치됩니다.


### Layout 기법

#### display 속성

display 속성은 요소의 <mark>기본 배치 방식</mark>을 바꾸는 속성입니다.

display:
- `block` : block 요소처럼 배치
- `inline` : inline 요소처럼 배치
- `inline-block` : inline처럼 배치되지만 block처럼 크기 조절 가능 (`width`, `height`)
- `none` : 화면에서 요소 제거


:::tip
`<li>` 요소는 기본적으로 블록 요소기 때문에 줄을 바꿔서 배치되는데, inline으로 변경하면 나란히 표시됩니다.
```css
li {
    display: inline;
}
```
:::

##### flexbox

display: flex를 적용하면 자식 요소들이 가로or세로로 한 줄 배치됩니다. 

```css
.container{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch; 
}
```
display:flex가 들어가는 부모 요소를 flex container, 자식 요소를 flex item라 부릅니다.

flex container에 적용하는 속성
- `flex-direction` : 가로(row), 세로(column) 방향
- `justify-content` : 메인축 정렬
- `align-items` : 수직축 정렬
- `flex-wrap` : 줄바꿈 여부

flex item 에 적용하는 속성
- `flex-basis` : item 의 기본 크기
- `flex-grow` : item 이 flex-basis의 값보다 커질 수 있는지 설정
- `flex-shrink` : item 이 flex-basis의 값보다 작아질 수 있는지 설정
- `flex` : 위 세 속성을 한번에 쓸 수 있는 축약형 속성
- `align-self` : 개별 아이템 정렬

##### grid

CSS Grid는 2차원(행과 열) 레이아웃을 다루기 위한 방식입니다. 페이지 전체 레이아웃(header, sidebar, main ,footer)의 구조를 짤 때 유용합니다.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; 
  grid-template-rows: auto 200px; 
  gap: 10px;
}
```
- grid-template-columns, grid-template-rows : 행과 열 크기 정의
- fr 단위 : 남은 공간을 비율로 나눔
- gap : 셀 간격



#### floats

해당 요소와 그 뒤에 따르는 블록 수준 요소의 동작이 변경
👉 과거에는 레이아웃을 잡는 데도 자주 썼지만, 지금은 Flexbox와 Grid가 주도권을 잡고 있어 특수한 경우(텍스트 주변 배치) 외에는 잘 쓰이지 않습니다.

- `none` : 기본값
- `left` : 왼쪽으로 띄움
- `right` : 오른쪽으로 띄움
- `inherit` : 부모 요소에서 상속


#### position

레이아웃이 아닌, 특정 항목의 위치를 관리하고 미세 조정

- `static` : 기본값
- `relative` : 자기 자신의 원래 위치를 기준으로 이동
- `absolute` : 가장 가까운 `relative` 부모를 기준으로 배치
- `fixed` : 화면(viewport)을 기준으로 고정 (스크롤해도 안 움직임)
- `sticky` : 스크롤 위치에 따라 상대적/고정적인 위치

---

#### table

옛날에는 `<table>` 태그로 페이지 전체 레이아웃을 설정하기도 하였지만, 현재는 쓰이지 않습니다. 표를 만들때는 여전히 사용합니다.

:::warning

CSS 레이아웃은 크게 일반 흐름 -> table -> flexbox -> grid 으로 발전
간단한 배치 → display, position
1차원 정렬 → flexbox
2차원 레이아웃 → grid
텍스트 흐름 → float, multi-column
상황에 맞게.. 잘 써봅시다.
:::