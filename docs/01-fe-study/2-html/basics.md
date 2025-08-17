---
sidebar_position: 1
---

# HTML 문서 구조 & 태그

:::note
프론트엔드 중요 개념 - <mark>HTML 내용 정리 1편</mark>입니다.

프론트엔드 프로그래밍의 기반이 되는 개념 입니다.

개념정리 끝에는 관련 **면접질문**을 첨부하였으니 도움이 되었으면 좋겠습니다.
:::


## 2.1. Learn the Basics
:::info
- [HTML 문서 구조 \& 태그](#html-문서-구조--태그)
  - [2.1. Learn the Basics](#21-learn-the-basics)
    - [HTML 이란?](#html-이란)
  - [태그 목록](#태그-목록)
    - [HTML 문서 구조 태그](#html-문서-구조-태그)
    - [텍스트](#텍스트)
    - [리스트](#리스트)
    - [링크 \& 이미지](#링크--이미지)
    - [테이블](#테이블)
    - [Form](#form)

:::

<br/>

### HTML 이란?

HTML(HyperText Markup Language)은 웹 페이지의 구조를 정의하는 **마크업 언어 입니다.** 우리가 흔히 보는 웹사이트의 뼈대를 만드는 역할을 하며, 이를 **브라우저가 해석**하여 화면에 출력합니다. 이름에서의 `HyperText`는 다른 페이지나 리소스로 이동할 수 있는 `Link` 기능을 제공한다는 의미이고, `Markup Language`는 `<tag>`와 같은 태그를 이용해 문서 구조를 표현한다는 뜻입니다. 즉, HTML은 단순히 글자를 보여주는 것 이상으로 문서의 <mark>제목, 본문, 이미지, 링크</mark> 등 다양한 요소를 구분하고 배치하는 도구입니다.


--- 



## 태그 목록
### <mark>HTML 문서 구조 태그</mark>

```jsx
<!DOCTYPE html>
<html lang="ko-KR">
	<head>
		<meta name="viewport" content="width=device-width">
		<meta charset="UTF-8">
		<title>hamrang-log</title>
	</head>
	<body>
		<div>내용</div>
	</body>
</html>
```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<!DOCTYPE html>` | HTML5 문서임을 선언 | `<!DOCTYPE html>` |
| `<html>` | HTML로 작성되도록 선언 | `<html lang="ko-KR">` |
| `<head>` | 문서의 메타데이터 | `<head>…</head>` |
| `<meta>` | 문서 정보 | `<meta charset="UTF-8">` |
| `<title>` | 문서 제목 | `<title>hamrang-log</title>` |
| `<body>` | 화면에 보이는 컨텐츠 | `<body>…</body>` |

++  
`<meta name="viewport" content="width=device-width">` 

뷰포트 요소
`width=device-width` 를 통해 기기의 실제 화면 너비에서 페이지가 렌더링 하도록 하여, 모바일 브라우저에서 축소 없이 모바일 화면에 맞춰 바로 표시됨


--- 


### <mark>텍스트</mark>

```jsx
<h1>제목</h1>
<h2>부제목<h2>
<h3>부부제목<h3>
<h4>부부부제목<h4>
<h5>부부부부제목<h5>
<h6>부부부부부제목<h6>

<p>내용입니다.</p>
<p>
	본문입니다.<strong>**중요한 점**</strong>은 본문이라는 점입니다...
</p>
<p>
	<span style="color:red">분홍색 내용</span>
	<br>
	내용
</p>
```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<h1>` ~ `<h6>` | 제목(1-6 단계) | `<h1>제목</h1>` |
| `<p>` | 문단 | `<p>내용입니다.</p>` |
| `<br>` | 줄바꿈 | `내용<br>내용` |
| `<strong>` | 굵은 글씨 | `<strong>중요한 점</strong>` |
| `<span>` | 인라인 컨테이너 | `<span style="color:pink">분홍색 내용</span>` |



--- 


### <mark>리스트</mark>

```jsx
<h2>장바구니 목록</h2>
<ul>
  <li>신발</li>
  <li>모자</li>
  <li>가디건</li>
</ul>

<h2>블로그 글 조회수 순위</h2>
<ol>
  <li>프론트엔드 로드맵 개념 정리 2025</li>
  <li>인터넷 개념 정리 - 인터넷과 네트워크</li>
  <li>HTTP 개념 정리 - 무상태와 비연결성(쿠키, 세션)</li>
</ol>
```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<ul>` | 순서 없는 목록 | `<ul><li>항목</li></ul>` |
| `<ol>` | 순서 있는 목록 | `<ol><li>항목</li></ol>` |
| `<li>` | 목록 아이템 | `<li>항목</li>` |




--- 


### <mark>링크 & 이미지</mark>

```jsx
<a href="https://hamrang.vercel.app/">hamrang-log</a>
<img src="images/profile.png" alt="My Profile" />
```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<a>` | 하이퍼링크 | `<a href="https://hamrang.vercel.app/">hamrang-log</a>` |
| `<img>` | 이미지 | `<img src="images/profile.png" alt="My Profile" />` |
| `<video>` | 동영상 | `<video src="video.mp4" controls/>` |
| `<audio>` | 오디오 파일 | `<audio src="sound.mp3" controls/>` |



--- 


### <mark>테이블</mark>

```jsx
<table>
  <thead>
    <tr>
      <th>책 제목</th>
      <th>저자</th>
      <th>발행년도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>총,균,쇠</td>
      <td>재러드 다이아몬드</td>
      <td>1997</td>
    </tr>
    <tr>
      <td>채식주의자</td>
      <td>한강</td>
      <td>2007</td>
    </tr>
  </tbody>
</table>
```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<table>` | 표 생성 | `<table>…</table>` |
| `<thead>` | 표 머리 | `<thead>…</thead>` |
| `<tbody>` | 표 본문 | `<tbody>…</tbody>` |
| `<tfoot>` | 표 꼬리 | `<tfoot>…</tfoot>` |
| `<tr>` | 표의 행 | `<tr>…</tr>` |
| `<th>` | 제목 셀 | `<th scope="col">제목</th>` |
| `<td>` | 데이터 셀 | `<td colspan="2">내용</td>` |



---


### <mark>Form</mark>

```jsx
<form action="/signup" method="post">
  <label for="username">아이디:</label>
  <input type="text" id="username" name="username" placeholder="아이디 입력" required>
  <br><br>

  <label for="password">비밀번호:</label>
  <input type="password" id="password" name="password" required>
  <br><br>

	<label for="job">직업:</label>
  <select id="job" name="job">
    <option value="developer">개발자</option>
    <option value="designer">디자이너</option>
  </select>
  
  <p>관심사:</p>
  <input type="checkbox" id="html" name="interest" value="HTML">
  <label for="html">HTML</label>
  <input type="checkbox" id="css" name="interest" value="CSS">
  <label for="css">CSS</label>
  <input type="checkbox" id="js" name="interest" value="JavaScript">
  <label for="js">JavaScript</label>
  <br><br>

  <button type="submit">회원가입</button>
</form>

```

| 태그 | 설명 | 예시 |
| --- | --- | --- |
| `<form>` | 입력 양식 영역 | `<form action="/signup" method="post">…</form>` |
| `<input>` | 입력 필드 | `<input type="text" placeholder="이름">` |
| `<textarea>` | 여러 줄 입력 | `<textarea rows="4"></textarea>` |
| `<button>` | 버튼 | `<button type="submit">회원가입</button>` |
| `<select>` | 드롭다운 | `<select><option>1</option></select>` |
| `<option>` | 선택 항목 | `<option value="1" selected>첫 번째</option>` |
| `<label>` | 입력 항목 라벨 | `<label for="name">이름</label>` |


