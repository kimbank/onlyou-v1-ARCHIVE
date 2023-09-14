// import axios from "axios";
import { cookies } from 'next/headers';
import Error from "@/components/error";

export default async function MatchingLayout({
  dormancy,
  promotion_apply, promotion_rejected, promotion_waiting,
  application_extra, application_target,
  matching_before, matching_selection, matching_waiting,  matching_failure, matching_success
}) {
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
  } catch { }
  // console.log(status)

  switch (status) {
    // 매칭 휴면 상태
    case "dormancy":
      return dormancy;



    // 승급심사 제출이 필요한 상태
    case "promotion_apply":
      return promotion_apply;

    // 승급심사가 대기중인 상태
    case "promotion_waiting":
      return promotion_waiting;

    // 승급심사가 반려된 상태
    case "promotion_rejected":
      return promotion_rejected;



    // 매칭신청서 (본인부가정보)가 제출되지 않은 상태
    case "application_extra":
      return application_extra;

    // 매칭신청서 (타겟상대정보)가 제출되지 않은 상태
    case "application_target":
      return application_target;



    // 매칭 대기중 상태
    case "matching_before":
      return matching_before;

    // 매칭 선택 상태
    case "matching_selection":
      return matching_selection;

    // 매칭 상대 선택 대기 상태
    case "matching_waiting":
      return matching_waiting;

    // 매칭 성공 상태
    case "matching_success":
      return matching_success;

    // 매칭 미성사 상태
    case "matching_failure":
      return matching_failure;



    default:
      return <Error />
  }
}