from datetime import datetime

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

client = WebClient(token="xoxb-5301475984646-5866797928001-MGeFcgoU42Cfgaz8yHsxmmBC")


def slack_chat_post(female, male):
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*{datetime.now()}*",
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"- *여성*\n" +
                        f" - id: {female.id}\n" +
                        f" - mb: {female.mobile_number}\n" +
                        f" - nn: {female.nickname}\n"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"- *남성*\n" +
                        f" - id: {male.id}\n" +
                        f" - mb: {male.mobile_number}\n" +
                        f" - nn: {male.nickname}\n"
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
                        "text": "[매칭성공]\n" + f"{datetime.now()}",
                    }
                },
            ]
        }
    ]

    try:
        res = client.chat_postMessage(
            channel="C05TWRW1SDN",
            blocks=blocks,
            attachments=attchements
        )
        # print(res)

    except SlackApiError as e:
        print(e)