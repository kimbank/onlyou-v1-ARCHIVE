import boto3




async def presigned_url():
    service_name = 's3'
    endpoint_url = 'https://kr.object.ncloudstorage.com'
    region_name = 'kr-standard'
    access_key = "VSClcmle5FiglYFsonJB"
    secret_key = "6B8C6vV681LGwqXmPY7Pb6Pg8aDiXacmLgrEfSQf"

    s3 = boto3.client(service_name, endpoint_url=endpoint_url, aws_access_key_id=access_key, aws_secret_access_key=secret_key)

    url = s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': 'users-photo',
            'Key': 'logo.png'
        },
        ExpiresIn=300 # 만료시간을 60초하고싶을 경우 60, 하루로 하고싶다면 86400
    )

    print(url)
    return url
