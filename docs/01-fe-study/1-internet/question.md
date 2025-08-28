---
sidebar_position: 12
last_update:
  date: 8/26/2025
---

# 프론트엔드 기술 면접 질문 리스트

:::note
프론트엔드 기술 면접 질문 리스트 - 네트워크, HTTP, 브라우저 관련 **면접질문**입니다.

질문은 위에, 답변은 아래에 적어놨습니다.
:::



## 1. 웹 동작 원리

<details>
  <summary>[www.naver.com](http://www.naver.xn--com-568n/)에 접속할 때 생기는 과정에 대해 설명해주세요.</summary>
    1. 사용자가 웹브라우저 주소 창에 www.naver.com 입력
    2. 브라우저는 도메인 이름에 대한 IP 주소를 얻기 위해 DNS 조회 시작
    3. DNS 서버는 naver.com에 해당하는 ****IP주소를 브라우저에 전달
    4. 브라우저는 받은 IP주소로 TCP 연결을 위해 3-Way Handshake를 수행하여 서버와 연결 성립
    5. HTTPS일 경우, 연결 후 TLS 협상을 진행하여 암호화 통신 성립
    6. 브라우저는 준비된 연결을 통해 HTTP 요청을 웹 서버에 전송
    7. 웹 서버는 HTTP 요청 메세지를 받고 응답 데이터를 반환 (HTTP 응답)
    8. 브라우저는 HTTP 응답 내용으로 받은 HTML을 파싱하여 화면에 렌더링
</details>

<details>
  <summary>브라우저 렌더링 과정을 설명해 주세요.</summary>
  1. HTML 파싱 후 DOM 트리 구축
    2. CSS 파싱 후 CSSOM 트리 구축
    3. DOM과 CSSOM을 결합하여 렌더트리(Render Tree) 구축
    4. 레이아웃 구축(각 요소의 위치와 크기 결정)
    5. 페인팅(요소를 픽셀 단위로 그림)
    6. 컴포지팅(여러 레이어를 합쳐 최종 화면 표시)
</details>

<details>
  <summary>브라우저 동작 원리를 설명해주세요.</summary>

  사용자가 URL을 입력하면
    - DNS 조회로 IP 주소를 찾고
    - TCP 3-way 핸드셰이크를 통해 서버와 연결을 맺고
    - HTTPS라면 TLS 협상을 진행해 보안 연결을 만든 뒤
    - HTTP 요청을 서버에 보내고, 서버 응답을 받습니다.
    - 받은 HTML을 파싱해 DOM 트리 생성, CSSOM 트리 생성 후 렌더 트리를 만들고
    - 레이아웃, 페인팅, 컴포지팅 단계를 거쳐 화면에 웹페이지를 표시합니다.
</details>

<details>
  <summary>브라우저 캐시에 대해 설명해주세요.</summary>

  한 번 방문한 리소스를 저장해두고, 다음 방문시 저장된 캐시를 이용해 서버 요청을 줄이고 빠르게 페이지를 로드합니다.
</details>
    

## 2. 네트워크 기본 개념


<details>
  <summary>URI과 URL의 차이</summary>

  URI는 인터넷상의 리소스 자체를 식별하고 URL은 그 중에서도 리소스의 위치를 가리킵니다. 
</details>

<details>
  <summary>HTTP와 HTTPS의 차이점을 설명해 주세요.</summary>

  HTTP는 암호화되지 않은 통신 프로토콜로 데이터가 평문으로 전송됩니다.
    
    HTTPS는 SSL/TLS로 데이터가 암호화되어 전송되고, 인증서를 기반으로 서버의 신뢰성을 판단합니다.
    
</details>

<details>
  <summary>HTTP 프로토콜에 대해 설명해주세요.</summary>

  HTTP는 웹에서 데이터를 주고 받기 위해 서버-클라이언트가 지키는 규칙입니다.
</details>

<details>
  <summary>HTTP와 HTTPS는 각각 몇 번 포트를 이용하나요?</summary>

  HTTP가 80번 HTTPS는 43번
</details>

<details>
  <summary>HTTPS 동작 방식에 대해 설명해주세요.</summary>

  클라이언트가 서버에 접속 요청을 하면 서버는 SSL 인증서를 클라이언트에 보냅니다.
    
    클라이언트는 인증서를 검증해 서버 신원을 확인합니다.
    
    클라이언트와 서버가 협상하여 대칭키 암호화를 위한 세션키를 안전하게 교환합니다. (TSL 핸드셰이크)
</details>

<details>
  <summary>SSL 인증서란 무엇인가요?</summary>

  웹 사이트의 신원을 증명하는 디지털 증명서
사이트 주체, 인증기관, 공개 키, 유효기간 등이 포함
    
</details>

## 3. HTTP 메서드


<details>
  <summary>HTTP Method와 각각이 사용되는 경우를 설명해주세요.</summary>
  
    **`GET`** 서버에 데이터 요청 (회원 정보 조회, 로그인)
    
    **`POST`** 서버에 데이터 전송 (회원가입)
    
    **`PUT`** 리소스 생성 | 교체 (글 업로드)
    
    **`PATCH`** 리소스 일부 수정 (글 수정)
    
    **`DELETE`** 리소스 삭제 (글 삭제)
    
    **`HEAD`** GET과 동일하지만 헤더정보만 받을때
</details>

<details>
  <summary>GET과 POST의 차이를 설명해주세요.</summary>
  
    **GET**
    
    URL에 요청 데이터가 포함되어 전송하여 길이에 제한 있을 수 있음
    
    URL에 데이터가 노출되므로 보안에 취약
    
    브라우저에서 캐싱, 북마크 될 수 있다.
    
    데이터를 검색하거나 조회하는 데 사용
    
    **POST**
    
    데이터를 HTTP 요청 본문에 포함되어 전송하여 길이 제한 거의 없음
    
    보안에 상대적으로 안전
    
    캐싱, 북마크 될 수 없어 매번 새로운 요청을 보내야함
    
    데이터를 생성하거나 수정하는 데 사용
</details>

<details>
  <summary>PUT 메서드와 PATCH 메서드의 차이점은 무엇인가요?</summary>

  **PUT**
    
    요청한 리소스를 완전히 교체할때 사용
    
    멱등성 보장 (같은 요청 반복 시 결과 동일)
    
    **PATCH**
    
    리소스의 일부만 수정함
    
    멱등성을 보장하지 않을 수 있음
</details>

## 4. HTTP 기타


<details>
  <summary>HTTP 응답 헤더에 있는 필드를 아는 대로 말씀해주세요.</summary>
  
    `Content-Type` 응답 데이터의 MIME 타입
    
    `Content-Length` 응답 본문의 길이
    
    `Cache-Control` 캐싱 정책 설정
    
    `Set-Cookie` 클라이언트에 쿠키를 설정
    
    `Server` 서버 소프트웨어 정보
    
    `Location` 리다이렉션 URL
    
    `Expires` 캐시 만료 시간
    
    `ETag` 리소스 식별자
    
    `Last-Modified` 리소스 마지막 수정 시간
</details>

<details>
  <summary>HTTP 상태 코드에서 500번은 서버와 클라이언트 중 어떤 쪽 에러인가요?</summary>
  
    서버측 에러
</details>

<details>
  <summary>HTTP의 무상태(stateless)와 비연결성(connectionless)에 대해 설명해주세요.</summary>
    
    무상태 : 상태정보를 저장하지 않아 각 요청이 독립적임
    
    비연결성 : 클라이언트의 요청에 맞는 응답을 마치면 연결을 끊음
</details>

## 5. 웹 API


<details>
  <summary>RESTful API에 대해 설명해 주세요.</summary>
  
    REST 원칙를 따르는 API로,
    
    URI를 통해 자원을 명확히 식별하고
    
    HTTP 메서드를 사용해 자원에 대한 CRUD 작업을 수행하는 설계 방식
    
    즉 요청된 주소만 보고도 어떤 자원에 대한 요청인지 알 수 있도록 설계하는 방식입니다.
</details>

<details>
  <summary>CORS에 대해 설명해주세요.</summary>
  
    CORS는 브라우저 보안 정책인 동일 출처 정책(SOP) 때문에 발생하는 제한을 우회하기 위한 매커니즘입니다.
    
    브라우저는 다른 출처의 리소스 요청을 제한하는데,
    
    서버가 특정 **CORS 허용 헤더**를 응답에 포함하면 브라우저는 해당 API 요청을 허용하여 교차 출처 리소스 공유가 가능해집니다.
</details>

## 6.보안 & 인증


<details>
  <summary>CSRF와 XSS 공격을 막는 방법은 무엇인가요?</summary>
  
  CSRF 방어
    
    XSS 방어
    
    (작성중)
</details>

<details>
  <summary>인증을 어떻게 처리하나요?</summary>

  세션 기반 인증 : 로그인 시 서버가 세션 생성 후 세션 ID를 쿠키로 클라이언트에 전달하면, 클라이언트는 쿠키를 통해 인증 상태를 유지합니다.
    
    토큰 기반 인증 : 로그인 시 서버가 서명된 토큰을 발급하면, 클라이언트는 토큰을 저장해 API 요청 시 헤더에 포함하여 인증하고 서버는 토큰을 검증하여 인증을 처리합니다.
</details>
    


## 7.웹 스토리지 & 세션


<details>
  <summary>쿠키와 세션의 차이점은 무엇인가요?</summary>
  
    쿠키는 서버가 응답할때 생성되어 브라우저에 저장됨
    
    이후 요청마다 자동으로 쿠키가 전송
    
    만료시간을 설정할 수 있고 브라우저 종료시에도 유지됨
    
    세션
    
    서버에서 생성되고 관리됨. 클라이언트는 세션 id만 쿠키 형태로 가지고 있음
    
    서버는 세션 id를 통해 세션 정보를 식별
    
    브라우저 종료시 삭제되며, 쿠키보다 보안성이 높음
</details>

<details>
  <summary>쿠키, sessionStorage, localStorage의 차이점은 무엇인가요?</summary>
  
    쿠키는 HTTP 헤더에 포함되어 전달되며, 크키 제한이 작고, 만료 기간을 설정할 수 있음
    
    sessionStorage는 클라이언트에 데이터를 저장하며, 서버로 자동 전송되지 않음. 브라우저 탭 단위로 저장되어 해당 탭이 닫히면 삭제됨
    
    localStorage는 클라이언트에 데이터를 저장하며, 서버로 자동 전송되지 않음. 만료기간이 없어 사용자가 직접 삭제하지 않는 한 데이터가 유지됨.
</details>

<details>
  <summary>페이지 로드 시간을 줄이는 방법들에 대해서 설명해 주세요.</summary>
  
    1. 리소스 최적화 : 이미지, CSS, JS 파일의 크기를 압축하고 최적화
    2. 코드 정리
    3. 비동기 처리 : async 또는 defer로 스크립트 비동기 로딩, Lazy Loading 적용
    4. 캐싱 활용 : 브라우저가 리소스를 재사용하도록 유도
    5. 네트워크 요청 최소화
    6. 서버 성능 개선
    7. 렌더링 최적화
</details>