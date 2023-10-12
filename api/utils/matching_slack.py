import hashlib
import hmac
import base64
import requests
import time

from datetime import datetime

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

from dotenv import load_dotenv
from os import path, environ

base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
load_dotenv(path.join(base_dir, ".env"))


################ ENVIRONMENT VARIABLES ################
NCP_API_ACCESS_KEY = environ.get("NCP_API_ACCESS_KEY")
NCP_API_SECRET_KEY = environ.get("NCP_API_SECRET_KEY")

NCP_SENS_MOBILE_NUMBER = environ.get("NCP_SENS_MOBILE_NUMBER")
NCP_SENS_URL_LOGIN = environ.get("NCP_SENS_URL_LOGIN")
NCP_SENS_SERVICE_ID_LOGIN = environ.get("NCP_SENS_SERVICE_ID_LOGIN")

SLACK_TOKEN_LOGIN = environ.get("SLACK_TOKEN_LOGIN")
SLACK_CHANNEL_MATCHING_AGREEMENT = environ.get("SLACK_CHANNEL_MATCHING_AGREEMENT")
client = WebClient(token=SLACK_TOKEN_LOGIN)
########################################################


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
    url = NCP_SENS_URL_LOGIN

    service_id = NCP_SENS_SERVICE_ID_LOGIN

    access_key = NCP_API_ACCESS_KEY
    secret_key = bytes(NCP_API_SECRET_KEY, 'UTF-8')
    method = "POST"
    uri = f"/sms/v2/services/{service_id}/messages"
    timestamp = str(int(time.time() * 1000))

    body = {
        "type": "LMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": NCP_SENS_MOBILE_NUMBER,
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
            channel=SLACK_CHANNEL_MATCHING_AGREEMENT,
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except:
        print('slack_chat_post error')
