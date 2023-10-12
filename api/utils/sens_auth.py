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
SLACK_CHANNEL_LOGIN = environ.get("SLACK_CHANNEL_LOGIN")
client = WebClient(token=SLACK_TOKEN_LOGIN)
########################################################


def make_signature(access_key, secret_key, method, uri, timestamp):
    message = method + " " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, "UTF-8")
    signing_key = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return str(signing_key)


def send_auth_code(mobile_number, auth_code):
    url = NCP_SENS_URL_LOGIN

    service_id = NCP_SENS_SERVICE_ID_LOGIN

    access_key = NCP_API_ACCESS_KEY
    secret_key = bytes(NCP_API_SECRET_KEY, 'UTF-8')
    method = "POST"
    uri = f"/sms/v2/services/{service_id}/messages"
    timestamp = str(int(time.time() * 1000))

    body = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": NCP_SENS_MOBILE_NUMBER,
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
            channel=SLACK_CHANNEL_LOGIN,
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except SlackApiError as e:
        print(e)