'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { InfoText } from "@/components/Notification";
import { AppBar, Container, Typography, LinearProgress, Box, Slider, BottomNavigation } from "@mui/material";
import { MainButton, SubButton, MainMiniButton, MainMiniCancelButton, SubMiniButton } from "@/components/Button";

import { HeightRange, DrinkRange, RadioButtons } from "@/components/Input";
import Height from "@/components/survey/target/height";
import Education from "@/components/survey/target/education";
import Divorce from "@/components/survey/target/divorce";

import Modal from '@/components/Modal';
import axios from 'axios';


export default function Target({ params }) {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(data_target);
  const [sub, setSub] = useState(false);
  const [valid, setValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  const fields = params.fields.split('%2C')

  if (fields.length < 3 || fields.length > 12) {
    window.location.href = '/application/target';
  }
  for (let i = 0; i < fields.length; i++) {
    if (!Object.keys(options_eng).includes(fields[i])) {
      window.location.href = '/application/target';
    }
  }

  useEffect(() => {
    let cnt = fields.length;
    const d = Object.keys(data);
    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < d.length; j++) {
        if (d[j].startsWith(fields[i])) {
          if (data[d[j]] == null) {
            cnt--;
            break;
          }
        }
      }
    }
    // console.log('progress count:', cnt);

    setProgress(cnt / fields.length * 100);
    if (cnt == fields.length) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [sub])

  const handleSubmit = async () => {
    const res = await axios.patch('/api/application/target/all', data);
    if (res.status == 200) {
      // window.location.href = '/application/letter';
      alert('이상형 정보 입력이 완료되었습니다.');
    } else {
      alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <>
      <AppBar sx={{ position: 'fixed', width: '100%', maxWidth:'480px', top:'60px', left: '50%', transform: 'translate(-50%, 0)', boxShadow: 'none' }}>
          <LinearProgress variant="determinate"
              value={progress}
              sx={{
                  transition: 'ease-out',
              }} />
      </AppBar>

      <Container disableGutters sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '64px',
        marginBottom: '80px',
      }}>
        <button onClick={() => console.log(data)}>정보 보기</button>
        <Typography className='heading2'>어떤 항목을 <br />어떻게 반영해드릴까요?</Typography>
        <Container disableGutters sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'8px'}}>
        {fields.map((field, index) => (
          <>
            <div key={index}>{options_eng[field]}</div>
          </>
        ))}
        </Container>
        { fields.includes('height') && <Height data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('education') && <Education data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('divorce') && <Divorce data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('smoking_history') && <></> }
        { fields.includes('drinking_life') && <></> }
        { fields.includes('owned_car') && <></> }
        { fields.includes('interests') && <></> }
        { fields.includes('number_relationships') && <></> }
        { fields.includes('athletic_life') && <></> }
        { fields.includes('pet_animal') && <></> }
        { fields.includes('religion') && <></> }

        { fields.includes('extrovert_or_introvert') && <></> }
        { fields.includes('intutive_or_realistic') && <></> }
        { fields.includes('emotional_or_rational') && <></> }
        { fields.includes('impromptu_or_planned') && <></> }
        { fields.includes('selfconfidence_or_careful') && <></> }

        { fields.includes('marriage_values') && <></> }
        { fields.includes('religious_values') && <></> }
        { fields.includes('opposite_friends_values') && <></> }
        { fields.includes('political_values') && <></> }
        { fields.includes('consumption_values') && <></> }
        { fields.includes('career_family_values') && <></> }

        { fields.includes('animal_image') && <></> }
        { fields.includes('double_eyelid') && <></> }
        { fields.includes('face_shape') && <></> }
        { fields.includes('body_type') && <></> }
        { fields.includes('skin_tone') && <></> }
        { fields.includes('tattoo') && <></> }
        { fields.includes('fashion_style') && <></> }

        { fields.includes('preffered_dating') && <></> }
        { fields.includes('preferred_contact_method') && <></> }
        { fields.includes('attractiveness_level') && <></> }
        { fields.includes('jealousy_level') && <></> }
        { fields.includes('love_initiative') && <></> }
        { fields.includes('dating_frequency') && <></> }
        { fields.includes('contact_style') && <></> }
        { fields.includes('skinship') && <></> }
        { fields.includes('sns') && <></> }
        { fields.includes('conflict_resolution_method') && <></> }

        <br />
        <BottomNavigation sx={{
          width: '100%', height: 'auto', borderRadius: '24px 24px 0 0', borderTop: '2px solid #fff', boxShadow: '1px -2px 12px -4px rgba(0, 0, 0, 0.25)', position: 'fixed',
          bottom: 0, left: 0, right: 0, maxWidth: '480px', left: '50%', transform: 'translate(-50%, 0)'
        }}>
          <Container disableGutters sx={{
            display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 32px', height: 'auto',
            flexShrink: '0', flexGrow: '1'
          }}>
            <Container disableGutters sx={{
              display: 'flex', flexDirection:'row', flexWrap:'wrap', alignItems: 'center', gap: '16px',
            }}>
              <InfoText title={'매칭 예상 주기 7일'} />
              <InfoText title={'경쟁률 높음'} />
            </Container>

            <Container disableGutters sx={{
              display: 'flex', flexShrink: '0', flexGrow: '1', gap: '16px',
            }}>
              <Link href='/application/target'>
                <SubButton buttonName='이전 단계' />
              </Link>
              { !valid ?
                <MainButton buttonName='입력을 완료해야 합니다' onClick={() => {}} /> :
                <MainButton buttonName='이상형 정보 입력 완료' onClick={() => setClicked(true)} />
              }
            </Container>
          </Container>
        </BottomNavigation>
        <Modal clicked={clicked} setClicked={setClicked}>
          <Typography className='heading2'>이상형을 꼭 찾아드릴게요!</Typography>
          <Typography className='basic'>이제 정말 마지막 단계입니다 <br />조금만 힘내요! 💪</Typography>
          <MainButton buttonName='편지 작성하기' onClick={() => handleSubmit()} />
        </Modal>
      </Container>
    </>
  )
}

const options_eng = {
  // date_birth: '나이',
  // residence: '거주지',
  // job_type: '직장 유형',
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
