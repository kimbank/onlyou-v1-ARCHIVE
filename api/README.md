# 단일 실행

클론 후 IDE를 켜서 진행하시면 될 것 같습니다.

IDE는 `Pycharm Professional`을 추천합니다. [Jetbrains 계열 학생 베네핏 획득 방법](https://docs.google.com/presentation/d/10xJyKdtq2c6ToSL-sS7Kp-wpw3k2H-ID0C93l_OChDg/edit?resourcekey=0-xO7Y4rqv6i_Yg1puhgzKog#slide=id.g155bae7d8c1_4_4)

__종속성 설치__

```bash
pip install -r requirements.txt
```

__실행__ _(pycharm에서 `run configuration`설정 후 진행 추천합니다. 방법은 저에게 물어보셔도 좋습니다.)_

```bash
python3 -m uvicorn api.main:app --reload
```

__종속성 추가시__

김은행에게 안내해 주시면 감사하겠습니다.


# 한신님 전달 사항

- 최상위 경로가 app -> api 로 변경 되었으니 유의 바랍니다.