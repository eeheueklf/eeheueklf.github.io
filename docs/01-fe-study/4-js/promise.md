---
sidebar_position: 4
last_update:
  date: 8/29/2025
---

# Promise / Async & Await

:::note
프론트엔드 중요 개념 - <mark>Javascript 내용 정리 4편</mark>입니다.
:::

## 젠장 난 프로미스가 싫다

프로미스.. 라는 개념이 좀 생소해서 좀 거리를 두고 있었는데 알고보니 프론트 개발할때도 많이 쓰고 있고, 여러 메서드에 잘 녹아들어있던 개념이더라구요? 사실 알고 보면 어렵지 않은 개념이니 잘 익혀봅시다.


## 언제 쓰는 거지?

[지난 포스트](https://eeheueklf.github.io/docs/fe-study/js/asyncs)에서 자바스크립트는 기본적으로 코드를 한 줄씩 순서대로 처리하는데, 오래걸리는 작업들은 Web API로 넘어가 백그라운드에서 처리한다고 정리했습니다. 
이때 지난 작업의 결과를 전달받아 처리해야하니까 보통은 콜백 함수를 사용합니다.

```jsx {13}
function readFile(filename, callback) {
  setTimeout(() => {
    callback(`파일 이름: ${filename}`);
  }, 1000);
}

function saveData(result1, callback) {
  setTimeout(() => {
    callback(result1 + " -> 저장됨");
  }, 3000);
}

readFile("data.txt", (result1) => {
  saveData(result1, (result2) => {
    console.log(result2);
  });
});

```

위의 코드의 흐름을 따라가면서 봅시다.  
1. readFile("data.txt", callback) 실행 -> 1초 뒤 `파일 이름: data.txt`을 callback에 전달
2. saveData(result1, callback) 실행 -> 3초 뒤 `파일 이름: data.txt -> 저장됨`을 callback에 전달
3. console.log(result2) 콘솔 출력

출력 결과 : `파일 이름 : data.txt -> 저장됨`

지금은 readFile -> saveData로 콜백이 한 번만 중첩되었지만 중간에 파일 내용을 가공한다던지 등등의 작업이 추가되면 코드가 점점 피라미드 형태로 깊어지는 콜백 지옥의 형태로 다가옵니다.
```jsx
function1("data.txt", (result1) => {
  function2(result1, (result2) => {
    function3(result2, (result3) => {
      function4(result3, (result4) => {
        console.log(result4);
      });
    });
  });
});
```

## Promise

이런 콜백 지옥을 개선한 방법이 Promise인데요, 

<mark>지금은 값이 없지만, 나중에는 **성공/실패 여부**를 알려주겠다고 약속하는 객체입니다.</mark> 그럼 프로미스의 특징을 보면서 어떻게 쓰는지 확인해봅시다.


---

1. Promise는 체이닝`.then()`으로 연결할 수 있어 코드가 중첩되지 않고 한 줄로 이어집니다.

```jsx {9-12}
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("작업 완료!");
    }, 3000);
  });
}

getData()
  .then(function1)
  .then(function2)
  .then(console.log)
```


2. 콜백 방식에서는 에러를 잡으려면 콜백마다 `try...catch`를 써야 해서 복잡하지만  
  Promise는 `.catch()` 하나로 에러를 잡을 수 있습니다.

```jsx
getData()
  .then(processData)
  .then(saveData)
  .catch((err) => console.error(err));
```

3. async/await와 함께 사용  
  Promise 기반 함수는 async/await 문법과 함께 사용할 수 있으며, 코드가 동기 코드처럼 읽히게 되어 훨씬 직관적입니다.  

```jsx
async function run() {
  try {
    const result1 = await getData();
    const result2 = await processData(result1);
    const result3 = await saveData(result2);
    console.log(result3);
  } catch (err) {
    console.error(err);
  }
}
run();
```

4. 여러 비동기 작업을 유연하게 제어할 수 있습니다.  
   비동기 작업 여러개를 동시에 실행하거나, 순서대로 실행하는 등 자유롭게 다룰 수 있습니다.
```jsx
Promise.all([getData(), getData2()])
  .then(([res1, res2]) => console.log(res1, res2));
```

---

## Promise의 세 가지 상태

Promise는 세 가지 상태를 가집니다.

* `pending` 대기 → 결과를 기다리는 상태(비동기 처리 중)
* `fulfilled` 이행 → 성공했을 때 결과값 전달 
* `rejected` 실패 → 실패했을 때 에러 전달

```jsx
new Promise((resolve, reject) => {
  // --- 비동기 처리 ---
  if(성공조건){
    resolve("성공!");
  } else{
    reject(new Error("실패")); 
  }
})
.then(result => {
  console.log("성공 시 결과값:", result);
})
.catch(error => {
  console.error("실패 시 에러:", error.message);
})
.finally(() => {
  console.log("작업 완료.");
});
```

- `.then()`은 `resolve()`가 호출되었을 때 결과값을 받고
- `.catch()`는 `reject()`가 호출되었을 때 에러를 받는다
- `.finally()`는 (마지막에) 반드시 실행된다.

