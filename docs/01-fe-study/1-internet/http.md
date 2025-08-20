---
sidebar_position: 4
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

## 1.2. What is a HTTP?

:::info
- [HTTP 요청 \& HTTP 응답](#http-요청--http-응답)
	- [1.2. What is a HTTP?](#12-what-is-a-http)
		- [1. HTTP](#1-http)
		- [2. HTTP 요청](#2-http-요청)
			- [2.1 start line](#21-start-line)
				- [HTTP 메서드](#http-메서드)
			- [2.2 headers](#22-headers)
			- [2.3 HTTP 본문](#23-http-본문)
		- [3. HTTP 응답](#3-http-응답)
			- [3.1 Status Line](#31-status-line)
				- [HTTP 상태 코드 (Status Code)](#http-상태-코드-status-code)
			- [3.2 headers](#32-headers)
			- [3.3 body](#33-body)

:::

<br/>
### 1. HTTP

`(Hypertext Transfer Protocol)`  
`하이퍼텍스트+전송+프로토콜`

HTTP는 웹에서 데이터를 주고 받기 위해 **서버-클라이언트**(브라우저)가 지키는 규칙입니다.

- 웹페이지 로드, 서버로부터 데이터를 받아오기 위한 규칙
- 웹에서 하이퍼 텍스트(HTML 문서 등)을 요청하고, 응답하고, 전송하는 데 사용됨

`https://www.google.com/`

우리가 접속하는 사이트주소(URL)도 `프로토콜 + 도메인 이름 + 경로`로 이루어져 있습니다.


---


### 2. HTTP 요청

HTTP 요청은 웹 브라우저에서 **웹 사이트를 로드**하는 데 필요한 **정보를 요청**하는 방법입니다.

HTTP 요청에는 다음과 같은 것들이 포함되어 있습니다.

`POST /index.html HTTP/1.1` -> start line

`Host: google.com Accept: text/html` -> headers

`{"query":"content"}` -> body (선택)

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
<br/><br/><br/>
HTTP 요청을 이루는 각 요소들을 자세히 살펴봅시다.

#### 2.1 start line
`HTTP 메서드`+`Request target`+`HTTP 버전`
```jsx
POST /index.html HTTP/1.
```
##### HTTP 메서드
`GET POST PUT PATCH DELETE`  
HTTP 메서드는 HTTP 요청이 서버에서 기대하는 작업을 나타냅니다.


- GET: 응답으로 정보를 기대함
- POST: 클라이언트가 웹 서버에 정보를 제출(ID PW)

<br/>
####  2.2 headers

`key: value 쌍으로 이루어진 핵심 정보`
```jsx
Host: google.com
Accept: text/html
Content-Type: application/json; charset=utf-8
User-Agent: Mozilla/5.0
Connection: keep-alive
```
HTTP 요청 헤더는 요청에 대한 추가 정보를 담고있는 부분으로 Key : value 쌍으로 구성되어 있습니다.

클라이언트가 사용하는 브라우저, 요청되는 데이터와 같은 핵심 정보를 전달합니다.

<br/>
#### 2.3 HTTP 본문

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
HTTP 본문은 HTTP 요청이 전송하는 데이터를 담고 있습니다.

HTML코드, CSS, JS 파일이 포함될 수 있으며

ID 및 비밀번호 또는 양식에 입력된 기타 데이터와 같이 웹 서버에 제출되는 모든 정보가 포함됩니다.



---


### 3. HTTP 응답

HTTP 응답은 웹 클라이언트에서 **HTTP 요청에 대한 응답**으로 웹 서버로부터 수신하는 응답입니다.

HTTP 응답에는 다음과 같은 것들이 포함되어 있습니다.

`HTTP/1.1 403 Forbidden` -> Status line

`Content-Type: application/json` -> headers

`{"error":"Forbidden"}` -> body (선택)

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
<br/>
<br/>
<br/>
#### 3.1 Status Line

`HTTP 버전`+`Status Code`+`Status Text`

##### HTTP 상태 코드 (Status Code)

`1XX 2XX 3XX 4XX 5XX`

상태 코드는 HTTP 요청이 성공적으로 완료되었는지 여부를 나타내는 데 가장 자주 사용되는 3자리 코드입니다.

- 1XX 정보 제공
- 2XX 성공
- 3XX 리디렉션
- 4XX 클라이언트 오류
- 5XX 서버 오류

XX는 00~99사이 숫자 | 2XX 성공 : 200 OK는 요청이 제대로 완료되었음을 나타냄

<br/>

#### 3.2 headers

`key: value 쌍으로 이루어진 핵심 정보`

```jsx
Server: Apache
Content-Type: application/json; charset=utf-8
Cache-control : private, max-age=0
```

HTTP 요청과 마찬가지로 HTTP 응답 헤더에는 응답 본문에서 전송되는 데이터의 언어 및 형식과 같은 핵심 정보를 Key : value 쌍의 형식으로 전달합니다.

<br/>

#### 3.3 body

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