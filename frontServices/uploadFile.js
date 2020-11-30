import AWS from 'aws-sdk'
AWS.config.update({
    region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID
    })
})
const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET }
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