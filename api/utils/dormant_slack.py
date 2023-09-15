from datetime import datetime

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

client = WebClient(token="xoxb-5301475984646-5866797928001-MGeFcgoU42Cfgaz8yHsxmmBC")


def slack_chat_post(mobile_number, user_id, gender, nickname, dormant: bool):
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
                "text": f"아이디: {user_id}\n" +
                        f"_성별: {'남' if gender is 1 else '여'}\n" +
                        f"닉네임: {nickname}\n"
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
                        "text": "[휴면전환일자]\n" + f"{datetime.now()}" if dormant else "[휴면해제일자]\n" + f"{datetime.now()}",
                    }
                },
            ]
        }
    ]

    try:
        res = client.chat_postMessage(
            channel="C05SE7CJWP7" if dormant else "C05T64WQU80", # 휴면전환, 휴면해제
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except SlackApiError as e:
        print(e)