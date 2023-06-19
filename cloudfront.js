const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

/**
 * From AWS console root user > security credentials
 * Refer to this screenshot https://cdn-images-1.medium.com/max/716/1*lj0SGfHRLt8pvoe1OLla6Q.png
 */
const accessKeyID = process.env.AWS_ACCESS_KEY

/**
 * From local
 * The contents of the private key file
 * Refer to this screenshot https://cdn-images-1.medium.com/max/716/1*5VBnhzFnZNRZ0jp3eY9uFA.png
 */
const privateKeyFilePath = './test.png'
const privateKeyContents = process.env.AWS_SECRET_ACCESS_KEY


/**
 * From AWS Console > Cloudfront > Distributions
 * Refer to this screenshot https://cdn-images-1.medium.com/max/716/1*UZI0mq0LJd5Hn2t5psOrwA.png
 */
const cfDomainName = `https://d23vuxxp7fn16p.cloudfront.net`

/**
 * From AWS Console > (path of our desired content)
 * Refer to this screenshot https://cdn-images-1.medium.com/max/558/1*MzwwxxEU5FOx2aBI1w7w0A.png
 */
const s3ContentPath = `somefolder/somefile.jpg`

const cfFullPath = `${cfDomainName}/${s3ContentPath}`
let signer = new AWS.CloudFront.Signer(accessKeyID, privateKeyContents)

const option = {
    url: cfFullPath,
    expires: Math.floor((new Date()).getTime()) + (60 * 60 * 1), // 1 hour from now
}


return new Promise((res, rej) => {
    signer.getSignedUrl(option, (err, url) => {
        if (err) {
            console.error(err)
            rej(err)
        } else {
            console.log(url);
            res(url)
        }
    })
})