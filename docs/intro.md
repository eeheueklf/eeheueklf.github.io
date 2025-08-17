---
sidebar_position: 1
last_update:
  date: 4/7/2024
  author: endi
---

# 🗨️ 마크다운 참고하기
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
👋 안녕하세요
---

🍪🍄‍🟫☕🤎🧸📜🌕🍞🍂🪐🧺🥖🐌🐻🪵🍩🐿️🍦
## 13. 경고/팁 박스 (Admonitions)

:::info
목차
:::

:::note
정보
:::

:::tip
팁
:::

:::warning
메모
:::

:::danger
경고
:::
---


## 2. 텍스트 스타일
**굵게**  
*기울임*  
~~취소선~~  
**굵고 _기울임_**

---

## 3. 목록
### 순서 없는 목록
- 아이템 1
- 아이템 2
  - 하위 아이템

### 순서 있는 목록
1. 첫 번째
2. 두 번째
   1. 하위 첫 번째

---

## 4. 링크 & 이미지

---

## 5. 코드
```js
console.log("JavaScript 코드 블록");
```

---

## 6. 인용문
> 인용문입니다.
>> 중첩 인용문입니다.

---

## 7. 구분선
---

---

## 8. 체크박스 (GFM)
- [x] 완료
- [ ] 미완료

---

## 9. 표 (GFM)
| 이름  | 나이 | 도시 |
|-------|------|------|
| 김철수 | 25   | 서울 |
| 이영희 | 30   | 부산 |

---

## 10. 각주
문장 안에서 각주를 달 수 있습니다[^1].

[^1]: 각주 내용

---

## 11. HTML 직접 사용
<span style={{ color: "red" }}>빨간 글자</span>  
<b>HTML 굵게</b>

---

## 12. 형광펜
<mark>기본 형광펜</mark>이 잖아~






---

## 14. 코드 블록 줄 하이라이트 (Prism)
```js {1,4}
function hello() {
  console.log("2번 줄 하이라이트");
}
console.log("4번 줄 하이라이트");
console.log("4번 줄 하이라이트");
console.log("4번 줄 하이라이트");
```

---


<details>
  <summary>Toggle me!</summary>

  This is the detailed content

  ```js
  console.log("Markdown features including the code block are available");
  ```
</details>