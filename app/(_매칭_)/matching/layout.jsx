// import axios from "axios";
import { cookies } from 'next/headers';

import Dormancy from "./@dormancy/page";

import PromotionApply from "./@promotion_apply/page";
import PromotionRejected from "./@promotion_rejected/page";
import PromotionWaiting from "./@promotion_waiting/page";

import ApplicationExtra from "./@application_extra/page";
import ApplicationTarget from "./@application_target/page";

import MatchingBefore from "./@matching_before/page";
import MatchingSelection from "./@matching_selection/page";
import MatchingWaiting from "./@matching_waiting/page";
import MatchingSuccess from "./@matching_success/page";
import MatchingFailure from "./@matching_failure/page";

import Error from "@/components/error";


export default async function MatchingLayout({}) {
  // Todo: fetch 통신 방법 및 토큰 validating 방식 개선 필요
  let status = "error";

  try {
    await fetch('http://127.0.0.1:8000/api/matching/status',
      { method: 'GET', cache: 'no-cache', credentials:'include', 
        headers: { 
          Authorization: cookies().get('access_token').value
        }
      })
      .then(response => response.json())
      .then(response => {status = response.msg}
    )
  } catch (e) { 
    return <Error />;
  }
  // console.log(status)
  

  status = "matching_waiting";

  switch (status) {
    // 매칭 휴면 상태
    case "dormancy":
      return <Dormancy />;



    // 승급심사 제출이 필요한 상태
    case "promotion_apply":
      return <PromotionApply />;

    // 승급심사가 대기중인 상태
    case "promotion_waiting":
      return <PromotionWaiting />;

    // 승급심사가 반려된 상태
    case "promotion_rejected":
      return <PromotionRejected />;



    // 매칭신청서 (본인부가정보)가 제출되지 않은 상태
    case "application_extra":
      return <ApplicationExtra />;

    // 매칭신청서 (타겟상대정보)가 제출되지 않은 상태
    case "application_target":
      return <ApplicationTarget />;



    // 매칭 대기중 상태
    case "matching_before":
      return <MatchingBefore />;

    // 매칭 선택 상태
    case "matching_selection":
      return <MatchingSelection />;

    // 매칭 상대 선택 대기 상태
    case "matching_waiting":
      return <MatchingWaiting />;

    // 매칭 성사 상태
    case "matching_success":
      return <MatchingSuccess />;

    // 매칭 미성사 상태
    case "matching_failure":
      return <MatchingFailure />;



    default:
      return <Error />;
  }
}