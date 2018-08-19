
module.exports = () => ({
  Bucket: process.env.LAZR_BUCKET,
  Expires: process.env.LAZR_EXPIRES || 60,
  ACL: 'public-read'
})
