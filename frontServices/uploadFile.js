import AWS from 'aws-sdk'
AWS.config.update({
    region: 'us-east-2',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:7ed3e8d6-e3b2-4493-a6a9-fa4b9fdd2ffe'
    })
})
const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: 'event-inscription-ssg' }
})

export default async function uploadFile ({ file, key }) {
    const empty = () => ''
    if (!file) return empty()

    const s3Upload = await s3.upload({
        Key: `${key}.${file.name.split('.').pop()}`,
        Body: file,
        ACL: 'public-read',
    }).promise().catch(err => {
        console.error(err)
        return null
    })

    if (!s3Upload) return empty()

    const url = s3Upload.Location
    return url
}