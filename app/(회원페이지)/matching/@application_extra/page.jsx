'use client'

import { InfoText } from "@/components/Notification";
import { MainButton } from "@/components/Button";

// 매칭 신청서(타겟상대)를 완성하지 못한 상태
export default function ApplicationExtra() {
  return (
    <>
      <h1>인연을 찾아드릴게요!</h1>
      <p>매칭에 참여하고, 인연을 만나보세요!</p>
      <br />
      <InfoText title="약 80명의 상대가 인연을 기다리고 있어요!" shadow={false} />
      <br/><br/><br/>
      <MainButton buttonName="내 정보 이어서 완성하기" shadow={false} />
    </>
  );
}
