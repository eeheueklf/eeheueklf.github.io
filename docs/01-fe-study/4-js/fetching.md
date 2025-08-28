---
sidebar_position: 5
toc_max_heading_level: 4
---

# Data Fetching(데이터 가져오기)


:::note
프론트엔드 중요 개념 - <mark>Javascript 내용 정리 5편</mark>입니다. 
:::

## 들어가며

웹 기술의 발전은 점점 개발자가 편리해지는 방향으로 나아가고 있는 것 같습니다. 프론트엔드는 다른 분야보다 더욱 빠르게 기술이 발전하고 있는데, 자바스크립트의 장점 같기도 하고 프론트엔드 기술이 아직 완성형이 아니라는 반증같기도 합니다. 제가 1학년때 배웠던 방법들이 4학년이 되고 나서는 바뀌었다는게 흥미롭기도 하면서 두렵기도 합니다...

아무튼 이번 개념은 Data Fetching(데이터 가져오기)에 관한 내용입니다. 어디선가 들어봤던 **Ajax, fetch(), jquery, axios** 이런 개념들도 다 ***Data Fetching***에 관련된 개념입니다.


## 뭐가 이렇게 많아

<mark>Data Fetching은 서버에서 데이터를 가져오는 과정을 의미합니다.</mark> 웹 개발에서 필수적인 과정이라고 할 수 있죠.

Data Fetching을 하는 과정은 점점 바뀌어왔는데요, 전통적인 AJAX방식에서 시작해 jQuery -> fetch API -> axios를 거쳐 진화하고 있습니다.

- `XMLHttpRequest(XHR)` 브라우저 내장 API
- `jQuery.ajax` XHR을 개선한 라이브러리
- `fetch API` 브라우저 내장 표준 API
- `axios` fetch를 개선한 라이브러리

브라우저 내장 기술이 개발되고 -> 불편한 점을 라이브러리로 개선 -> 내장 기술 업데이트 이런 과정으로 흘러갔던 게 보이네요

## 최신 기술 Fetch API

**fetch**는 브라우저에 내장된 표준 API로 별다른 라이브러리 설치 없이 브라우저에서 기본적으로 제공하는 기능입니다. **Promise 기반**이라 Javascript의 비동기 처리에 적절하며, `.then`이나 `.catch`를 이용해 서버에서 보내는 응답이나 예외를 처리할 수 있습니다.

### 사용법

```jsx
fetch(url, options)
.then((response)=> console.log(response))
.catch((error)=> console.log(error))
```
- `url` + `opstions`
- `fetch()`는 Promise 객체를 반환합니다 : 응답 성공시 `resolve`, 실패시 `reject`
- `.then`은 `resolve`일때 실행되고 `.catch`는 `reject`일때 실행됩니다
* *HTTP 요청에 관해서는 [HTTP 요청 & HTTP 응답](https://eeheueklf.github.io/docs/fe-study/internet/http)에 자세히 작성되어 있습니다.

:::tip tip
catch로 넘어가는 error는 네트워크 오류나 요청 자체가 실패했을 때만 발생하고 HTTP 오류(404, 500) 등은 resolve 되므로 실제 성공 여부는 response.ok로 확인해야합니다.
```jsx
fetch(url, options)
.then((response) => {if (!response.ok) throw new Error(`에러 발생 : ${response.status}`);})
.catch((error) => console.error(error));
```
:::


### GET 요청 예제

fetch 함수는 기본적으로 GET 요청이기 때문에 HTTP 메서드를 적을 필요가 없습니다. 따라서 option 없이 url만 입력합니다.


요청과 응답
```jsx title="member 조회"
fetch("/api/member")
.then((response)=> console.log(response));
```
```yaml title="서버 응답"
Response {
    type: "basic",
    url: "http://localhost/api/member",
    redirected: false,
    status: 200,
    ok: true,
    statusText: "OK",
    headers: Headers,
    body: ReadableStream,
    bodyUsed: false,
}
```

대부분의 API는 JSON 형태의 데이터를 응답해주기 때문에, `response.json()`를 사용해 JSON 문자열을 자바스크립트 객체로 변환해줍니다. 
(JSON은 데이터 저장 및 교환을 위한 텍스트 형식입니다.)

```jsx {3}
fetch("/api/member")
.then((response)=> response.json())
.then((json)=>console.log(json));
```

```json title="json"
{
  "id": 1,
  "userId": 'myId',
  "userName": 'hiri',
}
```


### POST 요청 예제

회원가입 등 서버에 데이터를 생성하거나 전송하기 위해서는 사용자 입력 값을 서버로 보내야합니다. POST 메서드와 options 객체를 요청에 포함해 주겠습니다.

```jsx {6}
fetch("/api/member/sign",{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "id": 'jamie11',
    "userName": 'jamie',
  }),
})
.then((response)=> response.json())
.then((json)=>console.log(json));
```
- `JSON.stringify`를 사용해 JavaScript 값이나 객체를 JSON 문자열로 변환합니다.