def get_score(data, target_data):
    PENALTY = -60
    PROMOTION_HATES = ['job_type', 'education']
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

    # 무조건 반영 부합 안 할시 -60점 처리
    # TODO: 가입 정보: 성별은 이미 필터링 되어 있기 때문에 생략, 미구현(residence 해야함)
    for key, value in target_data['u'].items():
        if value is None:
            continue
        if key == 'date_birth':
            if target_standard[key + '_s'] <= value <= target_standard[key + '_e']:
                score += target_standard[key + '_w']
            elif key in important_standard:
                score += PENALTY
            continue

    # 심사 정보
    for key, value in target_data['ud'].items():
        if value is None:
            continue
        # 꺼리는 정보
        # TODO: job_type은 문자열 -> 단일 선택 정보 취급해야할듯
        if key in PROMOTION_HATES:
            if value in target_standard[key].split(','):
                if key in important_standard:
                    score += PENALTY
                continue
            else:
                score += target_standard[key + '_w']

        elif key == 'height':
            if target_standard[key + '_s'] <= value <= target_standard[key + '_e']:
                score += target_standard[key + '_w']
            elif key in important_standard:
                score += PENALTY
            continue

        elif key == 'divorce':
            if target_standard[key] == value:
                score += target_standard[key + '_w']
            elif key in important_standard:
                score += PENALTY
            continue

    # 부가 정보
    # TODO: interests, religion, fashion_style은 문자열 -> 단일 선택 정보 취급해야할듯
    # TODO: 근데 religion은 꺼리는 선지임 -> 이건 별도로 처리
    for key, value in target_data['ue'].items():
        if value is None:
            continue
        # 꺼리는 정보
        if key in EXTRA_HATES:
            if value in target_standard[key].split(','):
                if key in important_standard:
                    score += PENALTY
                continue
            else:
                score += target_standard[key + '_w']

        # 단일 선택 정보
        elif key in EXTRA_SINGLES:
            if target_standard[key] == value:
                score += target_standard[key + '_w']
            elif key in important_standard:
                score += PENALTY
            continue

        # 다중 선택 정보
        else:
            if value in target_standard[key].split(','):
                score += target_standard[key + '_w']
            elif key in important_standard:
                score += PENALTY
            continue

    return score


def get_scores(data, targets):
    score_dict = {}
    # 이상형 정보 분류
    for u, ud, ue in targets:
        target = {}
        target['u'] = u
        target['ud'] = ud
        target['ue'] = ue
        score_dict[u.id] = get_score(data, target)
    return score_dict
