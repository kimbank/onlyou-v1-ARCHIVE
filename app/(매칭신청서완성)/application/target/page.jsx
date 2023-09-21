'use client'

import React, { useState, useEffect } from 'react';

import { Container, Typography, LinearProgress, Box } from "@mui/material";
import { MainButton, MainMiniButton, MainMiniCancelButton, SubMiniButton } from "@/components/Button";
import { DangerNotification }  from "@/components/Notification";

import StepsToggle from "@/components/Steps";


export default function Target() {
  // const [variant, setVariant] = useState('query');
  // const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const popOptions = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter((item) => item !== option));
    } else {
      setOptions([...options, option]);
    }
  }

  const pushOptions = (option) => {
    if (options.length >= 12) {
      setAlertMessage('최대 12개의 항목을 선택할 수 있습니다.');
      setVisible(true);
      return;
    }
    if (!options.includes(option)) {
      setOptions([...options, option]);
    }
  }

  const handleNext = () => {
    if (options.length < 3) {
      setAlertMessage('최소 3개의 항목을 선택해주세요.');
      setVisible(true);
    } else if (options.length > 12) {
      setAlertMessage('최대 12개의 항목을 선택해주세요.');
      setVisible(true);
    } else {
      // console.log(options.join(','));
      window.location.href = `/application/target/${options.join(',')}`;
    }
  }

  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
    }}>
      <DangerNotification alertMessage={alertMessage} visible={visible} setVisible={setVisible} />
      <Typography className='heading2'>매칭에 반영될 조건을 <br />모두 골라주세요.</Typography>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <Typography className='heading5'>{options.length}개 선택되었어요.</Typography>
        <Typography className='basic-gray'>최소 3개, 최대 12개 항목을 선택해주세요.</Typography>
        <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'row',
            flexFlow: 'wrap',
            gap: '8px',
            marginTop: '8px',
          }}>
            { options.map((option, index) => {
              return <MainMiniCancelButton key={index} buttonName={options_eng[option]} onClick={() => popOptions(option)}/>;
            })}
        </Container>
      </Container>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        gap: '8px',
      }}>
        { Object.keys(options_eng).map((option, index) => {
          if (options.includes(option)) return <MainMiniButton buttonName={options_eng[option]} />;
          return <SubMiniButton key={index} buttonName={options_eng[option]} onClick={() => pushOptions(option)} />;
        })}
      </Container>
      <Container disableGutters sx={{
      }}>
        <MainButton buttonName='다음' onClick={() => {handleNext()}}/>
      </Container>
    </Container>
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
