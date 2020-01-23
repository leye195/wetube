import routes from "./routes";
import multer from "multer";
const upload = multer({ dest: "upload/videos/" }); //option을 이용해 저장 공간 설정 등 가능
export const localMiddleware = (req, res, next) => {
  //locals에 있는 것들은 템플릿에서 변수명 처럼 존재함
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = req.user || undefined; //passport에서 user를 로그인 시킬때 user object를 req.user에 저장해둠
  console.log(req.user);
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
export const uploadVideoMiddleware = upload.single("videofile");
//video를 저장하고 url 반환
