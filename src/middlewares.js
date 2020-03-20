import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import moment from "moment";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: "ap-northeast-2"
}); //s3 initialize

const uploadVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read", //access control list
    bucket: "wetuberbucket/videos" // 버킷아래 경로 설정
  }) //storage 설정, default는 nodejs 파일 시스템
}); //multer({ dest: "upload/videos/" }); //option을 이용해 저장 공간 설정 등 가능
const uploadImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetuberbucket/avatars"
  })
}); //multer({ dest: "upload/avatars/" });
const uploadBanner = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetuberbucket/banners"
  })
});
const uploadThumbnail = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetuberbucket/thumbnails"
  })
});
export const uploadVideoMiddleware = uploadVideo.single("videofile");
export const uploadImageMiddleware = uploadImage.single("avatar");
export const uploadBannerMiddleware = uploadBanner.single("banner");
export const uploadThumbnailMiddleware = uploadThumbnail.single("thumbnail");

export const localMiddleware = (req, res, next) => {
  //locals에 있는 것들은 템플릿에서 변수명 처럼 존재함
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || undefined; //passport에서 user를 로그인 시킬때 user object를 req.user에 저장해둠
  //console.log(req.user);
  res.locals.moment = moment;
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
