const aws=require("aws-sdk");
const multer=require("multer");
const multerS3=require("multer-s3");
const s3=new aws.S3({
    accessKeyId:process.env.S3_ACCESS_KEY_ID,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    reigon:process.env.S3_REGION

})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype=== "image/webp") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  };

  const upload = multer({
    fileFilter,
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
          
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString()+"_"+file.originalname.toString());
      },
    }),
  });

  module.exports=upload;