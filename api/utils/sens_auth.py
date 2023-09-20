import sys
import os
import hashlib
import hmac
import base64
import requests
import time

import random

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

client = WebClient(token="xoxb-5301475984646-5866797928001-MGeFcgoU42Cfgaz8yHsxmmBC")


def make_signature(access_key, secret_key, method, uri, timestamp):
    message = method + " " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, "UTF-8")
    signing_key = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return str(signing_key)


def send_auth_code(mobile_number, auth_code):
    url = "https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:316329234095:only_you_sms/messages"

    service_id = "ncp:sms:kr:316329234095:only_you_sms"

    access_key = "Yx6kQbwM43TXNprGMeIP"
    secret_key = bytes("WKW2OXoTa0ltZbSPaJIuRoVjKQbfM0td10hV56dL", 'UTF-8')
    method = "POST"
    uri = f"/sms/v2/services/{service_id}/messages"
    timestamp = str(int(time.time() * 1000))

    body = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": "01052418394",
        "subject": "인증번호 발송 제목",
        "content": "인증번호 발송 컨텐츠",
        "messages": [
            {
                "to": mobile_number,
                "subject": "인증번호 발송",
                "content": f"[온리유] 본인확인 인증번호({auth_code})를 입력해 주세요.",
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



def generate_verification_code():
    while True:
        # 6자리 숫자 랜덤 생성
        num = ''.join([str(random.randint(0, 9)) for _ in range(6)])

        # 같은 숫자가 3번 이상 연속되는지 확인
        if not any(num[i] == num[i + 1] == num[i + 2] for i in range(4)):
            return num


def slack_chat_post(mobile_number, auth_code, sens_result: dict):
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*전화번호: {mobile_number}*",
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
                        "text": "[Web발신]\n" + f"[온리유] 본인확인 인증번호({auth_code})를 입력해 주세요.",
                    }
                },
            ]
        }
    ]

    try:
        res = client.chat_postMessage(
            channel="C05QPM5RPFZ",
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except SlackApiError as e:
        print(e)