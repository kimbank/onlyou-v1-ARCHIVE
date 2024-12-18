'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { InfoText } from "@/components/Notification";
import { AppBar, Container, Typography, LinearProgress, Box, Slider, BottomNavigation } from "@mui/material";
import { MainButton, SubButton, MainMiniButton, MainMiniCancelButton, SubMiniButton } from "@/components/Button";

import { HeightRange, DrinkRange, RadioButtons } from "@/components/Input";

import DateBirth from "@/components/survey/target/date_birth";
import Residence from "@/components/survey/target/residence";

import JobType from "@/components/survey/target/job_type";
import Height from "@/components/survey/target/height";
import Education from "@/components/survey/target/education";
import Divorce from "@/components/survey/target/divorce";
import SmokingHistory from "@/components/survey/target/smoking_history";
import DrinkingLife from "@/components/survey/target/drinking_life";
import OwnedCar from "@/components/survey/target/owned_car";
import Interests from "@/components/survey/target/interests";
import NumberRelationships from "@/components/survey/target/number_relationships";
import AthleticLife from "@/components/survey/target/athletic_life";
import PetAnimal from "@/components/survey/target/pet_animal";
import Religion from "@/components/survey/target/religion";

import ExtrovertOrIntrovert from "@/components/survey/target/extrovert_or_introvert";
import IntutiveOrRealistic from "@/components/survey/target/intutive_or_realistic";
import EmotionalOrRational from "@/components/survey/target/emotional_or_rational";
import ImpromptuOrPlanned from "@/components/survey/target/impromptu_or_planned";
import SelfconfidenceOrCareful from "@/components/survey/target/selfconfidence_or_careful";

import MarriageValues from '@/components/survey/target/marriage_values';
import ReligiousValues from '@/components/survey/target/religious_values';
import OppositeFriendsValues from '@/components/survey/target/opposite_friends_values';
import PoliticalValues from '@/components/survey/target/political_values';
import ConsumptionValues from '@/components/survey/target/consumption_values';
import CareerFamilyValues from '@/components/survey/target/career_family_values';

import AnimalImage from '@/components/survey/target/animal_image';
import DoubleEyelid from '@/components/survey/target/double_eyelid';
import FaceShape from '@/components/survey/target/face_shape';
import BodyType from '@/components/survey/target/body_type';
import SkinTone from '@/components/survey/target/skin_tone';
import Tattoo from '@/components/survey/target/tattoo';
import FashionStyle from '@/components/survey/target/fashion_style';

import PrefferedDating from '@/components/survey/target/preffered_dating';
import PreferredContactMethod from '@/components/survey/target/preferred_contact_method';
import AttractivenessLevel from '@/components/survey/target/attractiveness_level';
import JealousyLevel from '@/components/survey/target/jealousy_level';
import LoveInitiative from '@/components/survey/target/love_initiative';
import DatingFrequency from '@/components/survey/target/dating_frequency';
import ContactStyle from '@/components/survey/target/contact_style';
import Skinship from '@/components/survey/target/skinship';
import Sns from '@/components/survey/target/sns';
import ConflictResolutionMethod from '@/components/survey/target/conflict_resolution_method';

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

    setProgress(cnt / fields.length * 100);
    if (cnt >= fields.length) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [sub])

  const handleSubmit = async () => {
    const res = await axios.patch('/api/application/target/all', data);
    if (res.status == 200) {
      setClicked(true);
    } else {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
        {/* <button onClick={() => console.log(data)}>정보 보기</button> */}
        <Typography className='heading2'>어떤 항목을 <br />어떻게 반영해드릴까요?</Typography>
        { fields.includes('date_birth') && <DateBirth data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('residence') && <Residence data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('job_type') && <JobType data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('height') && <Height data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('education') && <Education data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('divorce') && <Divorce data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('smoking_history') && <SmokingHistory data={data} setData={setData} sub={sub} setSub={setSub}  /> }
        { fields.includes('drinking_life') && <DrinkingLife data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('owned_car') && <OwnedCar data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('interests') && <Interests data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('number_relationships') && <NumberRelationships data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('athletic_life') && <AthleticLife data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('pet_animal') && <PetAnimal data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('religion') && <Religion data={data} setData={setData} sub={sub} setSub={setSub} /> }

        { fields.includes('extrovert_or_introvert') && <ExtrovertOrIntrovert data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('intutive_or_realistic') && <IntutiveOrRealistic data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('emotional_or_rational') && <EmotionalOrRational data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('impromptu_or_planned') && <ImpromptuOrPlanned data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('selfconfidence_or_careful') && <SelfconfidenceOrCareful data={data} setData={setData} sub={sub} setSub={setSub} /> }

        { fields.includes('marriage_values') && <MarriageValues data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('religious_values') && <ReligiousValues data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('opposite_friends_values') && <OppositeFriendsValues data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('political_values') && <PoliticalValues data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('consumption_values') && <ConsumptionValues data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('career_family_values') && <CareerFamilyValues data={data} setData={setData} sub={sub} setSub={setSub} /> }

        { fields.includes('animal_image') && <AnimalImage data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('double_eyelid') && <DoubleEyelid data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('face_shape') && <FaceShape data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('body_type') && <BodyType data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('skin_tone') && <SkinTone data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('tattoo') && <Tattoo data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('fashion_style') && <FashionStyle data={data} setData={setData} sub={sub} setSub={setSub} /> }

        { fields.includes('preffered_dating') && <PrefferedDating data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('preferred_contact_method') && <PreferredContactMethod data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('attractiveness_level') && <AttractivenessLevel data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('jealousy_level') && <JealousyLevel data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('love_initiative') && <LoveInitiative data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('dating_frequency') && <DatingFrequency data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('contact_style') && <ContactStyle data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('skinship') && <Skinship data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('sns') && <Sns data={data} setData={setData} sub={sub} setSub={setSub} /> }
        { fields.includes('conflict_resolution_method') && <ConflictResolutionMethod data={data} setData={setData} sub={sub} setSub={setSub} /> }

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
              <InfoText title={'회원님의 조건과 이상형 조건에 따라 7일~10일 이상의 주기로 매칭이 진행됩니다.'} />
              {/* <InfoText title={'경쟁률 높음'} /> */}
            </Container>

            <Container disableGutters sx={{
              display: 'flex', flexShrink: '0', flexGrow: '1', gap: '16px',
            }}>
              <Link href='/application/target'>
                <SubButton buttonName='이전 단계' />
              </Link>
              { !valid ?
                <MainButton buttonName='입력을 완료해야 합니다' onClick={() => {}} /> :
                <MainButton buttonName='이상형 정보 입력 완료' onClick={() => handleSubmit()} />
              }
            </Container>
          </Container>
        </BottomNavigation>
        <Modal clicked={clicked} setClicked={setClicked}>
          <Typography className='heading2'>저장을 완료했습니다!</Typography>
          <Typography className='basic'>이제 정말 마지막 단계입니다 <br />조금만 힘내요! 💪</Typography>
          <a href='https://g8h7y7g082m.typeform.com/to/p66iQin2'>
            <MainButton buttonName='편지 작성하기' />
          </a>
        </Modal>
      </Container>
    </>
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

const data_target = {
  date_birth_s: null,
  date_birth_e: null,
  date_birth_w: null,

  job_type: null,
  job_type_w: null,

  residence: null,
  residence_w: null,

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
