import hashlib
import hmac
import base64
import requests
import time

from datetime import datetime

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

client = WebClient(token="xoxb-5301475984646-5866797928001-MGeFcgoU42Cfgaz8yHsxmmBC")


def make_signature(access_key, secret_key, method, uri, timestamp):
    message = method + " " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, "UTF-8")
    signing_key = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return str(signing_key)


def sens_sms(mobile_number):
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
        "subject": "성사 안내",
        "content": "성사 안내 컨텐츠",
        "messages": [
            {
                "to": mobile_number,
                "subject": "성사 안내",
                "content": "[온리유] 축하드려요! 🎉\n" + "서로가 서로를 선택하여 카카오톡 아이디가 공개되었어요!",
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


async def slack_chat_post(female, male):
    try:
        female_result = sens_sms(female.mobile_number)
        male_result = sens_sms(male.mobile_number)

        blocks_female = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*전화번호: {female.mobile_number}*",
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"requestId: {female_result['requestId']}\n" +
                            f"requestTime: {female_result['requestTime']}\n" +
                            f"statusCode: {female_result['statusCode']}\n" +
                            f"statusName: {female_result['statusName']}\n"
                }
            },
        ]
        blocks_male = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*전화번호: {male.mobile_number}*",
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"requestId: {male_result['requestId']}\n" +
                            f"requestTime: {male_result['requestTime']}\n" +
                            f"statusCode: {male_result['statusCode']}\n" +
                            f"statusName: {male_result['statusName']}\n"
                }
            },
        ]
        attchements_female = [
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
        attchements_male = [
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

        client.chat_postMessage(
            channel="C05TWRW1SDN",
            blocks=blocks_female,
            attachments=attchements_female
        )
        client.chat_postMessage(
            channel="C05TWRW1SDN",
            blocks=blocks_male,
            attachments=attchements_male
        )
        # print(res)

    except:
        print('slack_chat_post error')
