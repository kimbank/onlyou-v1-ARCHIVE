'use client'

import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';
import { MainSelectButton, SubSelectButton, MainButton } from '@/components/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Detial({ params }) {
  const [data, setData] = useState({});
  const [nickname, setNickname] = useState('');
  const [selectable, setSelectable] = useState(false);

  useEffect(() => {
    axios.get(`/api/user/detail/${params.u_id}`)
      .then((res) => {
        setData(res.data.data);
        setSelectable(res.data.selectable);
        setNickname(res.data.nickname);
    })
  }, [])

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      <Typography className="heading2">
        {nickname}님의
        <br />
        상세 정보에요
      </Typography>

      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          border: 1,
          padding: "24px",
          gap: "48px",
          borderColor: "#FFC999",
        }}
      >
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Link href={`/user/${params.u_id}/letter`}>
            <Button sx={sx_default}>편지</Button>
          </Link>
          <Button sx={sx_selected}>상세</Button>
          <Link href={`/user/${params.u_id}/photo`}>
            <Button sx={sx_default}>사진</Button>
          </Link>
        </Container>

        <Typography className='basic'>
          { data.date_birth && content(options_eng.date_birth, data.date_birth) }
          { data.residence && content(options_eng.residence, data.residence) }
          { data.job_type && content(options_eng.job_type, data.job_type) }
          { data.height && content(options_eng.height, data.height) }
          { data.education && content(options_eng.education, data.education) }
          { data.divorce && content(options_eng.divorce, data.divorce) }
          { data.smoking_history && content(options_eng.smoking_history, data.smoking_history) }
          { data.drinking_life && content(options_eng.drinking_life, data.drinking_life) }
          { data.owned_car && content(options_eng.owned_car, data.owned_car) }
          { data.interests && content(options_eng.interests, data.interests) }
          { data.number_relationships && content(options_eng.number_relationships, data.number_relationships) }
          { data.athletic_life && content(options_eng.athletic_life, data.athletic_life) }
          { data.pet_animal && content(options_eng.pet_animal, data.pet_animal) }
          { data.religion && content(options_eng.religion, data.religion) }
          { data.extrovert_or_introvert && content(options_eng.extrovert_or_introvert, data.extrovert_or_introvert) }
          { data.intutive_or_realistic && content(options_eng.intutive_or_realistic, data.intutive_or_realistic) }
          { data.emotional_or_rational && content(options_eng.emotional_or_rational, data.emotional_or_rational) }
          { data.impromptu_or_planned && content(options_eng.impromptu_or_planned, data.impromptu_or_planned) }
          { data.selfconfidence_or_careful && content(options_eng.selfconfidence_or_careful, data.selfconfidence_or_careful) }
          { data.marriage_values && content(options_eng.marriage_values, data.marriage_values) }
          { data.religious_values && content(options_eng.religious_values, data.religious_values) }
          { data.opposite_friends_values && content(options_eng.opposite_friends_values, data.opposite_friends_values) }
          { data.political_values && content(options_eng.political_values, data.political_values) }
          { data.consumption_values && content(options_eng.consumption_values, data.consumption_values) }
          { data.career_family_values && content(options_eng.career_family_values, data.career_family_values) }
          { data.animal_image && content(options_eng.animal_image, data.animal_image) }
          { data.double_eyelid && content(options_eng.double_eyelid, data.double_eyelid) }
          { data.face_shape && content(options_eng.face_shape, data.face_shape) }
          { data.body_type && content(options_eng.body_type, data.body_type) }
          { data.skin_tone && content(options_eng.skin_tone, data.skin_tone) }
          { data.tattoo && content(options_eng.tattoo, data.tattoo) }
          { data.fashion_style && content(options_eng.fashion_style, data.fashion_style) }
          { data.preffered_dating && content(options_eng.preffered_dating, data.preffered_dating) }
          { data.preferred_contact_method && content(options_eng.preferred_contact_method, data.preferred_contact_method) }
          { data.attractiveness_level && content(options_eng.attractiveness_level, data.attractiveness_level) }
          { data.jealousy_level && content(options_eng.jealousy_level, data.jealousy_level) }
          { data.love_initiative && content(options_eng.love_initiative, data.love_initiative) }
          { data.dating_frequency && content(options_eng.dating_frequency, data.dating_frequency) }
          { data.contact_style && content(options_eng.contact_style, data.contact_style) }
          { data.skinship && content(options_eng.skinship, data.skinship) }
          { data.sns && content(options_eng.sns, data.sns) }
          { data.conflict_resolution_method && content(options_eng.conflict_resolution_method, data.conflict_resolution_method)}
          
        </Typography>


        { selectable === true &&
          <Container disableGutters sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginTop: '24px',
          }}>
            <MainSelectButton buttonName='수락하기' onClick={() => handleAccept()} />
            <SubSelectButton buttonName='거절하기' onClick={() => handleReject()} />
          </Container>
        }
        </Container>

        { selectable === true || true &&
        <a href="https://g8h7y7g082m.typeform.com/to/htWbQxB7">
          <MainButton buttonName='매칭 피드백하기' />
        </a>
        }
    </Container>
  );
}


async function handleAccept() {
  const res = await axios.get('/api/matching/select/true');
  window.location.href = '/matching';
}

async function handleReject() {
  const res = await axios.get('/api/matching/select/false');
  window.location.href = '/matching';
}

const content = (key, value) => {

  return (
    <>
      <Typography className='heading5'>{key}</Typography>
      <Typography className='basic'>{value}</Typography>
    </>
  )
}

const options_eng = {
  // 기본 정보
  date_birth: '나이',
  residence: '거주지',
  job_type: '직장 유형',
  height: '키',
  education: '학력',
  divorce: '돌싱 여부',

  // 부가 정보 - 생활 정보
  smoking_history: '흡연 여부',
  drinking_life: '음주 여부',
  owned_car: '자차 유무',
  interests: '관심사',
  number_relationships: '연애 횟수',
  athletic_life: '운동 생활',
  pet_animal: '반려동물',
  religion: '종교',

  // 부가 정보 - 성격 정보
  extrovert_or_introvert: '외향/내향',
  intutive_or_realistic: '직관/현실',
  emotional_or_rational: '감성/이성',
  impromptu_or_planned: '즉흥/계획',
  selfconfidence_or_careful: '자기확신/신중',

  // 부가 정보 - 가치관
  marriage_values: '결혼 가치관',
  religious_values: '종교의 중요성',
  opposite_friends_values: '이성 친구 가치관',
  political_values: '정치 성향',
  consumption_values: '소비 가치관',
  career_family_values: '커리어와 가정 가치관',

  // 부가 정보 - 외모 정보
  animal_image: '동물 이미지',
  double_eyelid: '쌍꺼풀',
  face_shape: '얼굴상',
  body_type: '체형',
  skin_tone: '피부톤',
  tattoo: '문신 유무',
  fashion_style: '패션 스타일',

  // 부가 정보 - 연애 스타일 정보
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


const sx_default = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#F7F4F2',
  color: '#3C3B3A',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
}

const sx_selected = {
  borderRadius: '8px',
  height: '35px',
  width: '56px',
  boxShadow: 'none',
  backgroundColor: '#3C3B3A',
  color: '#FFFFFF',
  fontFamily: 'Pretendard-Semibold',
  fontSize: '14px',
  letterSpacing: '1.25px',
  pointerEvents: 'none',
}