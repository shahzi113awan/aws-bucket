const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1' // Replace with your desired region
  });
  console.log(process.env.AWS_ACCESS_KEY);
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const filePath = './test.png';
const fileData = fs.readFileSync(filePath);

const uploadFile = () => {
  fs.readFile("test.png", (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'merchapi', // pass your bucket name
         Key: 'test.png', // file will be saved as testBucket/contacts.csv
         Body: fileData
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();