def get_score(data, target_data):
    print(f'안녕하세요, {data.male_id}입니다.')
    target_standard = {}
    score = 0
    for key, value in data.__dict__.items():
        base_key = key[:-2]
        if key.endswith('_w') and value is not None:
            for related_data in data.__dict__.keys():  # 해당 가중치에 대한 모든 정보를 저장 (_s, _e 등등)
                if related_data.startswith(base_key):
                    target_standard[related_data] = data[related_data]

    important_standard = {key: value for key, value in target_standard.items() if key.endswith('_w') and value == 5}

    # 여기서부터 다시 시작 9-17-2023
    # 이후 None이 아닌 이상형 정보(target_standard)를 기준으로 2의 이성 정보와 비교하며 점수 계산
    for key, value in target_data.items():
        if key not in target_standard.keys():
            continue

        # 생년월일과 키는 범위 정보이기 때문에 별도 처리
        if key == 'date_birth' or key == 'height':
            if target_standard[key + '_s'] <= value <= target_standard[key + '_e']:
                score += target_standard[key + '_w']
            elif key in important_standard:
                return 0
            else:
                continue

        # job_name의 경우 이상형 정보가 id로 저장되어 있기 때문에 id를 통해 job_name을 가져온 후 비교
        elif key == 'job_name_id':
            if value == target_standard[key]:
                score += target_standard['job_name_w']
            elif key in important_standard:
                return 0
            else:
                continue

        elif value == target_standard[key]:
            score += target_standard[key + '_w']

        elif key in important_standard:
            return 0

    return score


def get_scores(data, targets):
    score_dict = {}
    # 이상형 정보 분류
    for u, ud, ue, ut in targets:
        target = {}
        target['u'] = u
        target['ud'] = ud
        target['ue'] = ue
        target['ut'] = ut
        score_dict[u.id] = get_score(data, target)
    return score_dict
