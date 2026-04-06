---
sidebar_position: 1  
date: 2025-08-11
title: "HTML 문서 구조 & 태그"
---


## HTML 이란?

`HTML(HyperText Markup Language)`은 웹 페이지의 구조를 정의하는 **마크업 언어**이다. 

우리가 흔히 보는 웹사이트의 뼈대를 만드는 역할을 하며, 이를 **브라우저가 해석**하여 화면에 출력한다. 

이름에서의 `HyperText`는 다른 페이지나 리소스로 이동할 수 있는 `Link` 기능을 제공한다는 의미이고, `Markup Language`는 `<tag>`와 같은 태그를 이용해 문서 구조를 표현한다는 뜻이다. 

즉, HTML은 단순히 글자를 보여주는 것 이상으로 문서의 제목, 본문, 이미지, 링크 등 다양한 요소를 구분하고 배치하는 도구이다.

## 태그 목록

### HTML 문서 구조 태그

```html
<!DOCTYPE html>
<html lang="ko-KR">
    <!-- head -->
    <head>
        <meta name="viewport" content="width=device-width">
        <meta charset="UTF-8">
        <title>hamrang-log</title>
    </head>
    <!-- body -->
    <body>
        <div>내용</div>
    </body>
</html>
```
- `<!DOCTYPE html>` HTML5 문서임을 선언
- `<html>` HTML로 작성되도록 선언
- `<head>` 문서의 메타데이터
- `<meta>` 문서 정보
- `<title>` 문서 제목
- `<body>` 화면에 보이는 컨텐츠
- `<meta name="viewport" content="width=device-width">` 를 통해 기기의 실제 화면 너비에서 페이지가 렌더링 하도록 하여, 모바일 브라우저에서 축소 없이 모바일 화면에 맞춰 바로 표시됨

---

### 텍스트

```
<h1>제목</h1>
<h2>부제목<h2>

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

- `<h1>` ~ `<h6>` 제목(1-6 단계)
- `<p>` 문단
- `<br>` 줄바꿈
- `<strong>` 굵은 글씨
- `<span>` 인라인 컨테이너

---

### 리스트

```
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

- `<ul>` 순서 없는 목록
- `<ol>` 순서 있는 목록 
- `<li>` 목록 아이템

---

### 링크 & 이미지

```
<a href="https://hamrang.vercel.app/">hamrang-log</a>
<img src="images/profile.png" alt="My Profile" />
```

- `<a>` 하이퍼링크
- `<img>` 이미지
- `<video>` 동영상
- `<audio>` 오디오 파일


---

### 테이블

```
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

- `<table>` 표 생성
- `<thead>` 표 머리
- `<tbody>` 표 본문
- `<tfoot>` 표 꼬리
- `<tr>` 표의 행
- `<th>` 제목 셀
- `<td>` 데이터 셀

---

### Form

```
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

- `<form>` 입력 양식 영역 
- `<input>` 입력 필드 
- `<textarea>` 여러 줄 입력 
- `<button>` 버튼 
- `<select>` 드롭다운 
- `<option>` 선택 항목 
- `<label>` 입력 항목 라벨 