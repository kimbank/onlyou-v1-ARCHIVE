##################
### 기본-가입정보 ###
# users

def date_birth(num):
    return f"{num.year}년생"

# 거주지
def residence(num):
    mapping = ['서울 남부', '서울 서부', '서울 중부', '서울 북부', '서울 동부', '경기 북부', '경기 고양', '경기 서부', '경기 남부', '경기 동부', '인천']

    return mapping[int(num)]


##################
### 기본-심사정보 ###
# users_?_data

# 직장 유형
def job_type(num):
    mapping = ['대학생', '대학원생', '중견기업', '중소기업', '스타트업', '자영업자', '프리랜서', '전문직', '공무원', '공기업', '대기업', '법인 대표', '기타']

    return mapping[int(num)]


# 학력 #
def education(num):
    mapping = ['미진학', '전문대', '일반 4년제 대학', '명문대', '일류대']

    return mapping[int(num)]


# 돌싱 여부 #
def divorce(num):
    mapping = ['초혼', '돌싱']

    return mapping[int(num)]


##############
### 부가정보 ###
# users_?_data_extra

# 흡연 경력 #
def smoking_history(num):
    mapping = ['비흡연', '금연', '흡연']

    return mapping[int(num)]


# 음주 생활 #
def drinking_life(num):
    mapping = ['전혀 마시지 않음', '거의 마시지 않음', '이따금 마심(한 달 1 회 이상)', '종종 마심(주 1 회 이상)', '자주 마심(주 2 회 이상)']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret


# 자차 유무 #
def owned_car(num):
    mapping = ['미소유', '소유']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 관심사 #
def interests(nums):
    mapping = ['여행', '운동/스포츠', '책', '직무', '외국/언어', '영화/넷플릭스', '콘서트/공연/뮤지컬', '전시회', '재태크', '공예/만들기', '음악/악기', '댄스/무용',
               '봉사', '사교/인맥', '차/오토바이', '반려동물', '게임/오락', '사진/영상', '요리', '맛집/카페', '애니메이션']

    ret = []

    try:
        for n in nums.split(','):
            ret.append(mapping[int(n)])
        ret = ', '.join(ret)
    except:
        return None

    return ret

# 연애 횟수 #
def number_relationships(num):
    mapping = ['0회', '1~2회', '3~4회', '5~6회', '7회 이상']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 운동 생활 #
def athletic_life(num):
    mapping = ['중요성엔 공감하지만 규칙적으로 하고 있진 않다', '운동을 규칙적으로 꾸준히 한다']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 반려동물 #
def pet_animal(num):
    mapping = ['키우기 어렵습니다', '키우지 않으나 반려동물에 거부감은 없습니다', '한 마리 키웁니다', '두 마리 이상 키웁니다']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 종교 #
def religion(num):
    mapping = ['무교', '기독교', '천주교', '불교', '원불교', '기타']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 외향/내향 #
def extrovert_or_introvert(num):
    mapping = ['매우 외향적', '외향적', '중립', '내향적', '매우 내향적']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 직관/현실 #
def intutive_or_realistic(num):
    mapping = ['매우 직관적', '직관적', '중립', '현실적', '매우 현실적']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 감성/이성 #
def emotional_or_rational(num):
    mapping = ['매우 감성적', '감성적', '중립', '이성적', '매우 이성적']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 즉흥/계획 #
def impromptu_or_planned(num):
    mapping = ['매우 즉흥적', '즉흥적', '중립', '계획적', '매우 계획적']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 자기확신/신중
def selfconfidence_or_careful(num):
    mapping = ['매우 자기확신', '자기확신', '중립', '신중', '매우 신중']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 결혼 가치관
def marriage_values(num):
    mapping = ['비혼주의에요', '아직 결혼은 이르다고 생각해요', '사랑한다면 3년 내로 결혼도 생각할 것 같아요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 종교의 중요성
def religious_values(num):
    mapping = ['인생에서 종교는 중요하지 않아요', '종교가 중요하긴 하지만, 가장 중요한 요소는 아니에요', '종교가 매우 중요해요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 이성 친구 가치관
def opposite_friends_values(num):
    mapping = ['친한 친구라면 술, 영화도 괜찮아요', '식사, 커피 외에는 이해하기 어려워요', '친한 친구라도 단둘이 만나는 것은 자제해야 해요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 정치 성향
def political_values(num):
    mapping = ['관심 없어요', '진보에 가까워요', '보수에 가까워요', '중도에 가까워요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 소비 가치관
def consumption_values(num):
    mapping = ['조금 부족하더라도 편안한 미래를 위해 절약하고 싶어요', '지금 아니면 못하는 것들에 충분히 투자하고 싶어요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 커리어와 가정 가치과
def career_family_values(num):
    mapping = ['두 사람 모두 가정이 커리어보다 우선이었으면 해요', '두 사람 중 한 명은 커리어보다 가정에 신경을 썼으면 해요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 동물 이미지
def animal_image(num):
    mapping = ['강아지', '고양이', '여우', '곰돌이', '햄스터', '공룡']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 쌍커풀
def double_eyelid(num):
    mapping = ['무쌍', '속쌍', '유쌍']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 얼굴상
def face_shape(num):
    mapping = ['순한 얼굴상', '진한 얼굴상']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 체형
def body_type(num):
    mapping = ['슬림', '표준', '통통', '탄탄', '근육근육']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 피부톤
def skin_tone(num):
    mapping = ['하얀 편', '보통', '어두운 편']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 문신 유무
def tattoo(num):
    mapping = ['없음', '있음']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 패션 스타일
def fashion_style(num):
    mapping = ['캐주얼', '댄디', '스트릿', '아메카지', '포멀', '모던', '여성스러운']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 선호 데이트
def preffered_dating(num):
    mapping = ['정적인 데이트 선호', '활동적인 데이트 선호']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 선호 연락 수단
def preferred_contact_method(num):
    mapping = ['전화', '카톡']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 애교 레벨
def attractiveness_level(num):
    mapping = ['매우 많음', '많음', '보통', '적음', '매우 적음']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 질투 레벨
def jealousy_level(num):
    mapping = ['매우 많음', '많음', '보통', '적음', '매우 적음']
    ret = ''

    try: ret = mapping[int(num) + 2]
    except: return None

    return ret

# 연애 주도성
def love_initiative(num):
    mapping = ['보통 따라간다', '가끔 리드한다', '종종 리드한다', '주로 리드한다']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 데이트 빈도
def dating_frequency(num):
    mapping = ['일주일에 1번 미만', '일주일에 1번', '일주일에 2번', '일주일에 3번 이상']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 연락 스타일
def contact_style(num):
    mapping = ['시간 여유가 있고 서로 생각 날 때 연락했으면 해요', '바쁘더라도 연락은 최대한 자주 하는 게 좋아요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 스킨쉽(혼전순결)
def skinship(num):
    mapping = ['연애의 중요한 요소라고 생각해요', '결혼 전 관계는 원하지 않아요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 소셜 미디어(SNS)
def sns(num):
    mapping = ['둘만의 사생활을 공개적으로 올리는 건 별로예요', '좋아하는 사람과의 행복한 모습을 당당하게 올리는 게 좋아요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 갈등 해결 방식
def conflict_resolution_method(num):
    mapping = ['시간을 가지고 감정을 진정시킨 후 이야기하는 게 좋아요', '갈등은 바로 풀어야 해요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

# 만나기 전 정보
def information_before_meeting(num):
    mapping = ['만나기 전에는 간단히 장소와 시간만 정하고 싶어요', '만나기 전에도 카톡, 전화 등으로 서로를 알아가고 싶어요']
    ret = ''

    try: ret = mapping[int(num)]
    except: return None

    return ret

def decode_dict(data):
    ret = []
    for key, val in data.items():
        ret.append(val)

    return ret

def decode_value_with_key(key, value):
    ret = "?"

    if key == "date_birth":
        ret = date_birth(value)
    elif key == "residence":
        ret = residence(value)
    elif key == "job_type":
        ret = job_type(value)
    elif key == "education":
        ret = education(value)
    elif key == "divorce":
        ret = divorce(value)
    elif key == "smoking_history":
        ret = smoking_history(value)
    elif key == "drinking_life":
        ret = drinking_life(value)
    elif key == "owned_car":
        ret = owned_car(value)
    elif key == "interests":
        ret = interests(value)
    elif key == "number_relationships":
        ret = number_relationships(value)
    elif key == "athletic_life":
        ret = athletic_life(value)
    elif key == "pet_animal":
        ret = pet_animal(value)
    elif key == "religion":
        ret = religion(value)
    elif key == "extrovert_or_introvert":
        ret = extrovert_or_introvert(value)
    elif key == "intutive_or_realistic":
        ret = intutive_or_realistic(value)
    elif key == "emotional_or_rational":
        ret = emotional_or_rational(value)
    elif key == "impromptu_or_planned":
        ret = impromptu_or_planned(value)
    elif key == "selfconfidence_or_careful":
        ret = selfconfidence_or_careful(value)
    elif key == "marriage_values":
        ret = marriage_values(value)
    elif key == "religious_values":
        ret = religious_values(value)
    elif key == "opposite_friends_values":
        ret = opposite_friends_values(value)
    elif key == "political_values":
        ret = political_values(value)
    elif key == "consumption_values":
        ret = consumption_values(value)
    elif key == "career_family_values":
        ret = career_family_values(value)
    elif key == "animal_image":
        ret = animal_image(value)
    elif key == "double_eyelid":
        ret = double_eyelid(value)
    elif key == "face_shape":
        ret = face_shape(value)
    elif key == "body_type":
        ret = body_type(value)
    elif key == "skin_tone":
        ret = skin_tone(value)
    elif key == "tattoo":
        ret = tattoo(value)
    elif key == "fashion_style":
        ret = fashion_style(value)
    elif key == "preffered_dating":
        ret = preffered_dating(value)
    elif key == "preferred_contact_method":
        ret = preferred_contact_method(value)
    elif key == "attractiveness_level":
        ret = attractiveness_level(value)
    elif key == "jealousy_level":
        ret = jealousy_level(value)
    elif key == "love_initiative":
        ret = love_initiative(value)
    elif key == "dating_frequency":
        ret = dating_frequency(value)
    elif key == "contact_style":
        ret = contact_style(value)
    elif key == "skinship":
        ret = skinship(value)
    elif key == "sns":
        ret = sns(value)
    elif key == "conflict_resolution_method":
        ret = conflict_resolution_method(value)
    elif key == "information_before_meeting":
        ret = information_before_meeting(value)


    return ret
