import routes from "./routes";
import multer from 'multer';
const upload=multer({dest:"upload/videos/"});
export const localMiddleware=(req,res,next)=>{
    //locals에 있는 것들은 템플릿에서 변수명 처럼 존재함
    res.locals.siteName = "Wetube"; 
    res.locals.routes = routes;
    res.locals.user={
        isAuthenticated:true,
        id:1
    }
    next();
};
export const uploadVideoMiddleware=upload.single("videofile")
//video를 저장하고 url 반환