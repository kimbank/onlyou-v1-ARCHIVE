# 개요

```bash
├── api [FastAPI]
│   ├── common
│   │   └── [[ 설정 파일들 ]]
│   ├── database
│   │   └── [[ DB 연결 관련 ]]
│   ├── errors
│   │   └── [[ 에러 제어 관련 ]]
│   ├── middlewares
│   │   └── [[ 미들웨어 ]]
│   ├── routes
│   │   └── [[ 라우트 ]]
│   ├── utils
│   │   └── [[ 라우트에서 사용하기 위한 코드 저장 ]]
│   ├── main.py
│   ├── models.py
│   └── README.md (한신님을 위한 리드미)
│
├── app [Next.js]
│   ├── (랜딩페이지)
│   ├── (비회원페이지)
│   ├── (회원페이지)
│   ├── favicon.ico
│   ├── global.css
│   ├── layout.jsx
│   └── page.jsx
│
├── components
│   └── [[ 외주사 컴포넌트 디렉토리 ]]
├── public
│   └── [[ 정적 파일 디렉토리 ]]
.
.
.
├── package.json
└── README.md (모두를 위한 리드미)
```

_api: FastAPI 영역_

_app: Next.js 영역_


# 실행

__종속성 설치__

```bash
npm install
```

__서버 실행 (개발자 모드)__

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인


# API Swagger Docs

- [localhost:8000/docs](http://localhost:8000/docs)
- [localhost:3000/docs](http://localhost:3000/docs) - api 하위 경로만 이용 가능 (여기서 되면 프런트에서 된다고 생각하면 됩니다.)


## 사용방법

API는 피그마 단위로 분리해 두었습니다.

- 기능 단위로 테스트 해볼 URI를 선택
- 해당 API에 대한 파라미터, 리퀘스트 바디, 리스폰스가 나옵니다.
- 우측의 `Try it out`을 클릭한 후 리퀘스트의 형태를 확인하고 바디를 세팅하여 `Execute`를 눌러봅니다.
- 리스폰스에 대한 코드와 바디를 확인하며 개발을 진행합니다.

_Axios를 이용하여 요청을 컨트롤 합니다._


# 유용한 리소스

- [변수명 추천](https://www.curioustore.com/)


# 공식 문서

- [Next.js](https://nextjs.org/docs) - 넥스트 공식 문서
- [FastAPI](https://fastapi.tiangolo.com/ko/) - 넥스트 공식 문서
- [Next.js FastAPI Starter](https://vercel.com/templates/next.js/nextjs-fastapi-starter) - Next.js + FastAPI 조합 예제
- [notification-api](https://github.com/riseryan89/notification-api) - FastAPI 한글 예제
- [@asidorenko_](https://twitter.com/asidorenko_) - Next.js 트위터 네임드


# 회원가입 API 구현

## 요청 URL

```markdown
POST http://localhost:8000/api/login/new_user
```

## 요청 JSON 형식

```json
schema_extra = {
	"name": "사용자",
	"mobile_number": "01012345678",
	"gender": 0,
	"nickname": "온리유",
	"date_birth": "2023-08-21",
}
```

`gender` 만 숫자입니다. **(0: 여성, 1: 남성)**

# 심사정보 등록 API

## 요청 URL

```markdown
POST http://127.0.0.1:8000/api/promotion/create_promotion/{id}
```

## 요청 JSON 형식

```json
{
	"job_type": "스타트업",
	"job_name": "개발자",
	"job_group": "IT",
	"height": 160,
	"education": 2,
	"university_name": "○○대학교",
	"divorce": 0
}
// job부분만 필수정보
```

앞으로 API 만들 때마다 요청 URL과 요청 JSON 형식을 안내하는걸 노션에 적어두겠습니다.
더 필요한게 있다면 앞으로 추가하겠습니다~