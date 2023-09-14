'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import { Certification } from '@/components/Notification';
import { MainHalfButton, MainMiniButton, SubHalfButton, SubMiniButton } from '@/components/Button';
import { DefaultCheckbox } from '@/components/Checkbox';


// async function get_data() {
//   axios.get('/api/my_info')
//   .then(response => response.data)
//   .then(response => {console.log(response)})
// }

const MyInfo = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('/api/my_info')
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        });
  }, []);

  return (
    <Container disableGutters sx={{marginBottom: '80px'}}>


      <Container disableGutters sx={{
        marginTop: '128px',
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
      }}> 
        <div className='heading1'>내 정보</div>
        {/*백엔드로 구현되는 부분인거 같아 오렌지색 박스 안의 부분은
           건들이지 않았습니다.*/}
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: "24px",
          border: 1,
          padding: "24px",
          gap: '32px',
          borderColor: "#FFC999"
        }}>
          <Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            flexDirection: 'row-reverse'
          }}>
            {user.job_type && <Certification alertMessage="학력 인증" />}
            {user.education && <Certification alertMessage="직장 인증" />}
          </Container>
          <h1>{user.nickname}</h1>
          <p>{user.residence}</p>
          <p>{user.date_birth}년생</p>
        </Container>

        {/*매칭 활성화와 휴면 상태를 나타내는 버튼입니다.
        탈퇴페이지에서의 문제와 마찬가지로 옆으로 정렬이 되지않았습니다. */}  

        <Container sx={{
          flexDirection: 'row',
          gap: '0px'
          }}>
          <MainMiniButton buttonName={'매칭 활성화'}/> 
          <SubMiniButton buttonName={'휴면'}/>
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/*다음 아래의 버튼들의 크기가 컨테이너 가로길이를 전부 채우도록만 수정 부탁드립니다.*/}
          <div className='heading4' style={{marginBottom: '5px'}}>매칭 신청서 수정하기</div>
          <SubMiniButton buttonName={'내 정보 수정하기'}/>
          <SubMiniButton buttonName={'이상형 정보 수정하기'}/>
          <SubMiniButton buttonName={'인증 뱃지 수정하기'}/>
          <SubMiniButton buttonName={'편지 수정하기'}/>
        </Container>
        <Container disableGutters sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div className='heading4'>기타</div>
          <SubMiniButton buttonName={'지인 차단'} />
          <SubMiniButton buttonName={'인증 뱃지 추가하기'}/>
          <SubMiniButton buttonName={'매너 점수 조회'}/>
        </Container>
      </Container>
    </Container>
  );
}

export default MyInfo;
