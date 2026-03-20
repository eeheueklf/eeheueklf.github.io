---
sidebar_position: 4
toc_max_heading_level: 4
last_update:
  date: 7/24/2025
---

# HTTP 요청 & HTTP 응답

:::note
프론트엔드 중요 개념 - <mark>HTTP 개념 정리 1편</mark>입니다.

프론트엔드 프로그래밍의 기반이 되는 개념 입니다.

개념정리 끝에는 관련 **면접질문**을 첨부하였으니 도움이 되었으면 좋겠습니다.
:::
:::tip
HTTP는 관련 개념이 정말 많은데요 (포스팅 4개짜리임)

그만큼 기초적이고 실제로 응용되는 부분이 많으니 알아두시면 도움 될겁니다!
:::

## HTTP란?

[이전포스트](https://eeheueklf.github.io/docs/fe-study/internet/packet-switching)에서 인터넷 프로토콜에 대해서 다뤄봤는데요. 이번에는 웹 사이트와 브라우저가 데이터를 주고받기 위해 필요한 프로토콜에 대해서 다뤄보겠습니다.

우리에게 아주 친숙한 HTTP입니다. 웹 사이트 `URL` 시작에 있는 `https://` ~ `http://` 가 바로 그 HTTP입니다. 대부분의 웹 사이트가 왜 다 저걸로 시작하냐면, 웹 통신이 HTTP 규약을 지키기 때문입니다.

HTTP(Hypertext Transfer Protocol, 하이퍼텍스트 전송 프로토콜) 이름 그대로 웹 사이트와 브라우저가 하이퍼텍스트(대표적으로 `HTML`)를 주고받기 위해서 필요한 규약입니다. 웹 브라우저가 웹 페이지를 로드하기 위해서는 웹 서에 요청을 보내고, 서버는 이에 대한 응답 (`HTML` 등)을 보내옵니다. 또, 필요하다면 사용자의 입력이나 정보를 서버로 전송하기도 합니다. 그리고 이 모든 과정에 HTTP가 관여합니다.

:::warning
`https://www.google.com/` `chrome://settings/` `file:///C:/...`

우리가 접속하는 주소(URL)는 `프로토콜 + 도메인 이름 + 경로`로 이루어져 있습니다.
:::


## HTTP 요청

HTTP 요청은 웹 브라우저에서 **웹 사이트를 로드**하는 데 필요한 **정보를 요청**하는 방법입니다. `start line`, `headers`, `body`로 나뉩니다.

```jsx
POST /index.html HTTP/1.1 				-> start line
Host: google.com
Accept: text/html
Content-Type: application/json; charset=utf-8
User-Agent: Mozilla/5.0
Connection: keep-alive					-> headers

{
	"status": "ok",
	"extended" : true,
	"results": [
		{"value": 0, "type": "int64"},
		{"value": 1.0e+3, "type": "decimal"}
	]	
}							-> body
```




HTTP 요청을 이루는 각 요소들을 자세히 살펴봅시다.

### start line
```jsx
// HTTP 메서드 | Request target | HTTP 버전
POST /index.html HTTP/1.
```
#### HTTP 메서드
HTTP 메서드는 브라우저가 서버에 어떤 작업을 요청하는지 나타냅니다.  

- `GET`: 서버에 정보 요청
- `POST`: 서버에 데이터 제출
- `PUT`: 서버의 자원 수정/교체
- `PATCH`: 서버의 자원 수정
- `DELETE`: 서버의 자원 삭제


### headers

`key: value 쌍으로 이루어진 핵심 정보`
```jsx
Host: google.com
Accept: text/html
Content-Type: application/json; charset=utf-8
User-Agent: Mozilla/5.0
Connection: keep-alive
```
HTTP 요청 헤더는 요청에 대한 추가 정보를 담고있는 부분으로 Key : value 쌍으로 구성되어 있습니다. 클라이언트가 사용하는 브라우저, 요청되는 데이터와 같은 핵심 정보를 전달합니다.


### body

`가져올 실제 데이터 컨텐츠/메시지 본문`
```jsx
{
	"status": "ok",
	"extended" : true,
	"results": [
		{"value": 0, "type": "int64"},
		{"value": 1.0e+3, "type": "decimal"}
	]
}	
```
HTTP 본문은 HTTP 요청이 전송하는 데이터를 담고 있습니다. HTML코드, CSS, JS 파일이 포함될 수 있으며 ID 및 비밀번호 또는 양식에 입력된 기타 데이터와 같이 웹 서버에 제출되는 모든 정보가 포함됩니다.



## HTTP 응답

HTTP 응답은 웹 클라이언트에서 **HTTP 요청에 대한 응답**으로 웹 서버로부터 수신하는 응답입니다.  `Status line`, `headers`, `body`가 포함됩니다.

```jsx
HTTP/1.1 403 Forbidden					-> status line
Server: Apache
Content-Type: application/json; charset=utf-8
Cache-control : private, max-age=0			-> headers

<!doctype html>
<html lang="ko">
<head>
<link rel=stylesheet" type="text/css">			-> body
```

### Status Line

```jsx
//HTTP 버전 | Status Code | Status Text
HTTP/1.1 403 Forbidden	
```
#### HTTP 상태 코드 (Status Code)

상태 코드는 HTTP 요청이 성공적으로 완료되었는지 여부를 나타내는 데 가장 자주 사용되는 3자리 코드입니다.

- `1XX` 정보 제공
- `2XX` 성공
- `3XX` 리디렉션
- `4XX` 클라이언트 오류
- `5XX` 서버 오류

 예를 들어서 200 OK는 요청이 제대로 완료되었음을 나타냅니다.

<br/>

### headers

`key: value 쌍으로 이루어진 핵심 정보`

```jsx
Server: Apache
Content-Type: application/json; charset=utf-8
Cache-control : private, max-age=0
```

HTTP 요청과 마찬가지로 HTTP 응답 헤더에는 응답 본문에서 전송되는 데이터의 언어 및 형식과 같은 핵심 정보를 Key : value 쌍의 형식으로 전달합니다.


### body

```jsx
<!doctype html>
<html lang="ko">
<head>
<link rel=stylesheet" type="text/css">
```

요청된 정보가 포함된 본문이 있습니다.(대부분 웹 요청의 경우 HTML 데이터)

<br/>
<details>
  <summary>관련 면접 질문</summary>

      @ HTTP 프로토콜에 대해 설명해주세요.
    
    @ HTTP Method와 각각이 사용되는 경우에 대해서 설명해주세요.
    
    @ GET과 POST의 차이에 대해 설명해주세요.
    
    @ GET 메서드와 POST 메서드의 차이점에 대해 설명해주세요.
    
    @ PUT 메서드와 PATCH 메서드의 차이점에 대해 설명해주세요.
</details>