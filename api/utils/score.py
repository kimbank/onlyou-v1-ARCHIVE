from api.models.matching.matching_score_f2m import ScoreFToMSchema
from api.models.matching.matching_score_m2f import ScoreMToFSchema


def get_score(data, target_data, score_record):
    PENALTY = -60
    PROMOTION_HATES = ['education']  # TODO: job_type 추후에 추가
    EXTRA_SINGLES = ['athletic_life', 'pet_animal', 'consumption_values', 'preffered_dating',
                     'preferred_contact_method', 'contact_style', 'skinship', 'sns',
                     'conflict_resolution_method']  # Extra에서 단일 선택 정보
    EXTRA_HATES = ['smoking_history', 'religion']  # Extra에서 꺼리는 선지 정보
    target_standard = {}
    score = 0

    # 사용자의 이상형 기준 추출
    for key, value in data.items():
        base_key = key[:-2]
        if key.endswith('_w') and value is not None:  # 가중치가 존재하면
            for related_data in data.keys():  # 관련 정보 모두 저장(_s, _e 등등)
                if related_data.startswith(base_key):
                    target_standard[related_data] = data[related_data]

    important_standard = {key: value for key, value in target_standard.items() if key.endswith('_w') and value == 5}

    # 무조건 반영 부합 안 할시 -60점 처리, 성별은 이미 필터링 되어 있기 때문에 생략-
    for key, value in target_data['u'].items():
        if key == 'date_birth' and 'date_birth_w' in target_standard:
            if value is not None and target_standard[key + '_s'] <= value <= target_standard[key + '_e']:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            continue

    # 심사 정보
    for key, value in target_data['ud'].items():
        # 꺼리는 정보
        if key in PROMOTION_HATES and key in target_standard:
            if value is None or str(value) in target_standard[key].split(','):
                if key + '_w' in important_standard:
                    score += PENALTY
                    score_record[key] = PENALTY
                else:
                    score_record[key] = 0
            else:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            continue

        elif key == 'height' and 'height_w' in target_standard:
            if value is not None and (
                    target_standard[key + '_s'] <= value <= target_standard[key + '_e'] or value >= 185):
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            else:
                score_record[key] = 0
            continue

        elif key == 'divorce' and key in target_standard:
            if value is not None and target_standard[key] == value:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            else:
                score_record[key] = 0
            continue

    # 부가 정보
    for key, value in target_data['ue'].items():
        # 꺼리는 정보
        if key in EXTRA_HATES and key in target_standard:
            if value is not None and str(value) in target_standard[key].split(','):
                if key + '_w' in important_standard:
                    score += PENALTY
                    score_record[key] = PENALTY
                else:
                    score_record[key] = 0
                continue
            else:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']

        # 단일 선택 정보
        elif key in EXTRA_SINGLES and key in target_standard:
            if value is not None and target_standard[key] == value:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            else:
                score_record[key] = 0
            continue

        # interests는 extra, target 모두 중복 선택 가능 -> 하나라도 겹친다면 점수 부여
        elif key == 'interests' and key in target_standard:
            if value is None:
                if key + '_w' in important_standard:
                    score += PENALTY
                    score_record[key] = PENALTY
                else:
                    score_record[key] = 0
                continue
            mine, target = set(target_standard[key].split(',')), set(value.split(','))
            # 2개 이상 겹쳐야 점수 부여
            if len(mine & target) > 1:
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            else:
                score_record[key] = 0
            continue

        # 다중 선택 정보
        else:
            if key in target_standard and value is not None and str(value) in target_standard[key].split(','):
                score += target_standard[key + '_w']
                score_record[key] = target_standard[key + '_w']
            elif key + '_w' in important_standard:
                score += PENALTY
                score_record[key] = PENALTY
            else:
                score_record[key] = 0
            continue

    return score


def get_scores(gender, data, targets):
    score_list, score_record = [], {}
    # 이상형 정보 분류
    for u, ud, ue in targets:
        score_record = {}
        target = {}
        del (u.__dict__['_sa_instance_state'])  # SQLAlchemy 추적 정보 삭제
        del (ud.__dict__['_sa_instance_state'])
        del (ue.__dict__['_sa_instance_state'])
        target['u'] = u.__dict__
        target['ud'] = ud.__dict__
        target['ue'] = ue.__dict__
        score_sum = get_score(data, target, score_record)
        score_record['score_sum'] = score_sum
        print(f'점수: {score_record.items()}')
        if gender == 0:
            score_record['female_id'] = data['female_id']
            score_record['male_id'] = target['u']['id']
            score_list.append(ScoreFToMSchema(**score_record))
        else:
            score_record['male_id'] = data['male_id']
            score_record['female_id'] = target['u']['id']
            score_list.append(ScoreMToFSchema(**score_record))
    return score_list
