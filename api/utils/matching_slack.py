import hashlib
import hmac
import base64
import requests
import time

from datetime import datetime

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

client = WebClient(token="xoxb-5301475984646-5866797928001-MGeFcgoU42Cfgaz8yHsxmmBC")


msg = '''축하드립니다! 매칭이 성사되셨습니다.
아래 링크에서 인연의 연락처를 확인해보세요:)

https://only-you.co.kr

매너 있는 ONLYou만의 문화를 위해 몇 가지 주의사항을 안내드릴게요!!

- 매너 있는 채팅 및 대화 부탁드려요
- 술, 자취 관련 이야기는 자제해주세요 
- 답장이 느리다고 지속적으로 연락을 하거나, 동의 없이 전화를 거는 행위는 자제해주세요 
- 이유 없는 지각과 잠수를 주의해주세요 서로에게 좋은 인상으로 남도록 함께 노력해요. 

ONLYou의 시작과 함께해주셔서 정말 감사합니다.'''


def make_signature(access_key, secret_key, method, uri, timestamp):
    message = method + " " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, "UTF-8")
    signing_key = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return str(signing_key)


def sens_sms(female, male):
    url = "https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:316329234095:only_you_sms/messages"

    service_id = "ncp:sms:kr:316329234095:only_you_sms"

    access_key = "Yx6kQbwM43TXNprGMeIP"
    secret_key = bytes("WKW2OXoTa0ltZbSPaJIuRoVjKQbfM0td10hV56dL", 'UTF-8')
    method = "POST"
    uri = f"/sms/v2/services/{service_id}/messages"
    timestamp = str(int(time.time() * 1000))

    body = {
        "type": "LMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": "01052418394",
        "subject": "성사 안내",
        "content": "성사 안내 컨텐츠",
        "messages": [
            {
                "to": female,
                "subject": "[온리유]",
                "content": msg,
            },
            {
                "to": male,
                "subject": "[온리유]",
                "content": msg,
            }
        ]
    }

    key = make_signature(access_key, secret_key, method, uri, timestamp)[2:-1]
    headers = {
        # 'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': access_key,
        'x-ncp-apigw-signature-v2': key
    }

    res = requests.post(url, json=body, headers=headers)

    return res.json()


def slack_chat_post(female, male, sens_result: dict):

    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*[{female.nickname} && {male.nickname}]*\n" + f"*전화번호: {female.mobile_number}*",
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"requestId: {sens_result['requestId']}\n" +
                        f"requestTime: {sens_result['requestTime']}\n" +
                        f"statusCode: {sens_result['statusCode']}\n" +
                        f"statusName: {sens_result['statusName']}\n"
            }
        },
    ]
    attchements = [
        {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "[온리유] 축하드려요! 🎉\n" + "서로가 서로를 선택하여 카카오톡 아이디가 공개되었어요!",
                    }
                },
            ]
        }
    ]

    try:
        client.chat_postMessage(
            channel="C05TWRW1SDN",
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except:
        print('slack_chat_post error')
