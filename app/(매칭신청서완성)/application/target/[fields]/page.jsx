'use client'

import React, { useState, useEffect } from 'react';

import { Container, Typography, LinearProgress, Box, Slider } from "@mui/material";
import { MainButton, MainMiniButton, MainMiniCancelButton, SubMiniButton } from "@/components/Button";

import { HeightRange, DrinkRange, RadioButtons } from "@/components/Input";
import Height from "@/components/survey/height";


export default function Target({ params }) {
  const [data, setData] = useState(data_target);
  const fields = params.fields.split('%2C')

  if (fields.length < 3 || fields.length > 12) {
    window.location.href = '/application/target';
  }
  for (let i = 0; i < fields.length; i++) {
    if (!Object.keys(options_eng).includes(fields[i])) {
      window.location.href = '/application/target';
    }
  }

  return(
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <Typography className='heading2'>어떤 항목을 <br />어떻게 반영해드릴까요?</Typography>
      {fields.map((field, index) => (
        <>
          <div key={index}>{options_eng[field]}</div>
        </>
      ))}
      {/* <HeightRange buttonName={'asdasdsa'} />
      <DrinkRange buttonName={'asdasdsa'} />
      <RadioButtons left='내향적' right='외향적' /> */}
      { fields.includes('height') && <Height data={data} setData={setData} /> }
      { fields.includes('education') && <></>}
      { fields.includes('divorce') && <></>}
      { fields.includes('smoking_history') && <></>}
      { fields.includes('drinking_life') && <></>}
      { fields.includes('owned_car') && <></>}
      { fields.includes('interests') && <></>}
      { fields.includes('number_relationships') && <></>}
      { fields.includes('athletic_life') && <></>}
      { fields.includes('pet_animal') && <></>}
      { fields.includes('religion') && <></>}
      { fields.includes('extrovert_or_introvert') && <></>}
      { fields.includes('intutive_or_realistic') && <></>}
      { fields.includes('emotional_or_rational') && <></>}
    </Container>
  )
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
  interest: '관심사',
  number_relationships: '연애 횟수',
  athletic_life: '운동 생활',
  pet_animal: '반려동물',
  religion: '종교',

  extrovert_or_realistic: '외향/내향',
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

const data_target = {
  height_s: null,
  height_e: null,
  height_w: null,

  education: null,
  education_w: null,

  divorce: null,
  divorce_w: null,

  smoking_history: null,
  smoking_history_w: null,

  drinking_life: null,
  drinking_life_w: null,

  owned_car: null,
  owned_car_w: null,

  interests: null,
  interests_w: null,

  number_relationships: null,
  number_relationships_w: null,

  athletic_life: null,
  athletic_life_w: null,

  pet_animal: null,
  pet_animal_w: null,

  religion: null,
  religion_w: null,

  extrovert_or_introvert: null,
  extrovert_or_introvert_w: null,

  intutive_or_realistic: null,
  intutive_or_realistic_w: null,

  emotional_or_rational: null,
  emotional_or_rational_w: null,

  impromptu_or_planned: null,
  impromptu_or_planned_w: null,

  selfconfidence_or_careful: null,
  selfconfidence_or_careful_w: null,

  marriage_values: null,
  marriage_values_w: null,

  religious_values: null,
  religious_values_w: null,

  opposite_friends_values: null,
  opposite_friends_values_w: null,

  political_values: null,
  political_values_w: null,

  consumption_values: null,
  consumption_values_w: null,

  career_family_values: null,
  career_family_values_w: null,

  animal_image: null,
  animal_image_w: null,

  double_eyelid: null,
  double_eyelid_w: null,

  face_shape: null,
  face_shape_w: null,

  body_type: null,
  body_type_w: null,

  skin_tone: null,
  skin_tone_w: null,

  tattoo: null,
  tattoo_w: null,

  fashion_style: null,
  fashion_style_w: null,

  preffered_dating: null,
  preffered_dating_w: null,

  preferred_contact_method: null,
  preferred_contact_method_w: null,

  attractiveness_level: null,
  attractiveness_level_w: null,

  jealousy_level: null,
  jealousy_level_w: null,

  love_initiative: null,
  love_initiative_w: null,

  dating_frequency: null,
  dating_frequency_w: null,

  contact_style: null,
  contact_style_w: null,

  skinship: null,
  skinship_w: null,

  sns: null,
  sns_w: null,

  conflict_resolution_method: null,
  conflict_resolution_method_w: null
}

