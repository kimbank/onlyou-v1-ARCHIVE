'use client'

import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Detial({ params }) {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`/api/user/detail/${params.u_id}`)
      .then((res) => {
        setData(res.data);
    })
  }, [])

  return (
    <>
      <Typography className='basic'>
        { Object.keys(data).map((key, index) => {
          return (
            <div key={index}>
              <strong>{options_eng[key]}</strong>
              : {data[key]}
              <br />
            </div>
          )
        })
        }
      </Typography>
    </>
  );
}

const options_eng = {
  date_birth: '나이',
  residence: '거주지',
  job_type: '직장 유형',
  height: '키',
  education: '학력',
  divorce: '돌싱 여부',

  smoking_history: '흡연 여부',
  drinking_life: '음주 여부',
  owned_car: '자차 유무',
  interests: '관심사',
  number_relationships: '연애 횟수',
  athletic_life: '운동 생활',
  pet_animal: '반려동물',
  religion: '종교',

  extrovert_or_introvert: '외향/내향',
  intutive_or_realistic: '직관/현실',
  emotional_or_rational: '감성/이성',
  impromptu_or_planned: '즉흥/계획',
  selfconfidence_or_careful: '자기확신/신중',

  marriage_values: '결혼 가치관',
  religious_values: '종교의 중요성',
  opposite_friends_values: '이성 친구 가치관',
  political_values: '정치 성향',
  consumption_values: '소비 가치관',
  career_family_values: '커리어와 가정 가치관',

  animal_image: '동물 이미지',
  double_eyelid: '쌍꺼풀',
  face_shape: '얼굴상',
  body_type: '체형',
  skin_tone: '피부톤',
  tattoo: '문신 유무',
  fashion_style: '패션 스타일',

  preffered_dating: '선호 데이트 ',
  preferred_contact_method: '선호 연락 수단',
  attractiveness_level: '애교 레벨',
  jealousy_level: '질투 레벨',
  love_initiative: '연애 주도성',
  dating_frequency: '데이트 빈도',
  contact_style: '연락 스타일',
  skinship: '스킨십(혼전순결)',
  sns: '소셜 미디어(SNS)',
  conflict_resolution_method: '갈등 해결 방식',
}
