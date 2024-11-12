import AWS from 'aws-sdk';
import config from './config';

AWS.config.update({
  accessKeyId: config.s3.access_key,
  secretAccessKey: config.s3.secret_key,
  region: config.s3.region,

});
export const s3 = new AWS.S3();
