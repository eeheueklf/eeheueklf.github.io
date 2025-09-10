---
sidebar_position: 2
toc_max_heading_level: 4
last_update:
  date: 9/10/2025
---

# 패키지 매니저 npm yarn

## 들어가며

```bash
npm run dev
npm install
npm start
npx create-react-app my-app
yarn start
```
우리는 프로젝트를 만들거나 새로운 기능이 필요할 때 `bash` / `command prompt` 등 터미널에서 명령어를 실행합니다. 검색해보면 어떨 때는 `npm` 을 어떨 때는 `yarn`을 사용합니다. 이런 명령어는 무엇인지 어떤 차이가 있는지 알아봅시다.

## 패키지 매니저란?

패키지 매니저는 **패키지를 관리해주는 도구**입니다. 패키지를 설치, 업데이트 및 삭제를 하거나 프로젝트에서 필요한 의존성 `dependency` 들을 관리합니다. 
여기서 패키지는 **다른 개발자들이 미리 만들어 놓은 코드 묶음**을 뜻하며, 라이브러리와 비슷한 개념입니다.

예를 들어 React 프로젝트에서는 react 패키지를 설치하고 `import` 구문을 통해 필요한 패키지를 불러올 수 있습니다.
```jsx
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
```

### package.json

각 패키지는 계속 업데이트 되기 때문에, 프로젝트에서 참조하는 버전이 무엇인지 관리해야 합니다. `package.json`에는 이러한 프로젝트 정보와 패키지 목록을 기록합니다.

```jsx
"dependencies": {
  "@docusaurus/core": "3.1.1",
  "@docusaurus/preset-classic": "3.1.1",
  "@mdx-js/react": "^3.0.0",
  "clsx": "^2.0.0",
  "prism-react-renderer": "^2.3.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
},
```

새로운 환경에서 프로젝트를 실행할 때 `npm install`을 통해서 `package.json`에 있는 패키지를 설치합니다.

```bash
git clone <프로젝트 주소>
npm install
```

## JavaScript 패키지 매니저

- `npm` : Node.js 기본 패키지 매니저
- `yarn` : npm의 단점을 개선
- `pnpm` : 의존성 중복 저장 문제 해결

npm은 Node.js의 기본 패키지 매니저로 CLI(Command Line Interface)로 쉽게 패키지를 관리할 수 있습니다.

yarn은 npm의 단점을 개선하기 위해 Facebook에서 만든 패키지 매니저입니다. 이 블로그도 페이스북에서 개발한 docusaurus를 활용해 개발되었는데, 그래서 그런지 yarn을 통해 관리합니다.

pnpm은 node_modules를 효율적으로 관리해 설치 속도가 빠르고, 의존성 중복 저장 문제를 해결한 최신 패키지 매니저라고 합니다.

:::info
많은 패키지들은 해당 패키지의 실행을 위해 다른 패키지가 필요할 수도 있다. 이때 필요한 패키지를 **dependency**(의존성)라고 한다.
따라서 하나의 프로젝트 안에서 같은 패키지의 여러 버전이 공존하기도 한다. A라는 패키지가 **C@1**를, B라는 패키지가 **C@2**를 필요로 할때, 패키지 매니저는 각각의 의존성을 충돌 없이 관리해준다.
:::

## 관련 명령어

```bash
# 패키지 설치
npm install <패키지이름>

# package.json의 모든 패키지 설치
npm install

# package.json 생성
npm init 

# 패키지 업데이트
package update <패키지이름>
```




참고  
 [`모듈화와 npm(node package manager)`](https://poiemaweb.com/nodejs-npm)
