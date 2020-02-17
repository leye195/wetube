# WeTube

YouTube Clone with VanillaJS & NodeJS(Express)

- VanillaJS, NodeJS(Express)
- Template: PUG
- DB: mongoDB
- Storage: AWS S3

## Link:

- http://vvetube.herokuapp.com/

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload Video
- [x] Video Detail
- [x] Edit Video

## Features:

- register, login -- passport.js(local,github,kakao,naver)
- edit profile, change password, change banner image, edit link/description
- upload video, record video, edit video
- post comment, delete comment, replay comment(진행 중)
- search video, like/unlike video
- subscribe

### 공부 소득

- 1.youtube 클론 코딩을 진행하면 기존에 잘 모르고 사용했던 express 그리고 미들웨어 함수 설정에 대한 개념이 좀 더 명확해졌음!!!
- 2.기초적이지만 babel, eslint ,webpack에 대한 설정을 통해 모던한 javascript를 사용한 코딩은 기존에 사용하던 코드 보다 더 간결하고 섹싀~ 해졌음(nomadCode 강의 너무 유익함)
- 4.css가 아닌 scss로 스타일링 진행해 자주 사용하는 형태들은 mixin을 적용, 색깔 혹은 자주 사용 될 값들은 따로 변수로 관리 그리고 nested (어디에 속하는지 딱딱 알수 있어서 너무 좋음)를 이용할수 있다는게 기존의 css에서 생각했던 것과 달랐음
- 5.passport.js 를 이용한 간편한 소셜 로그인 (물론 이해하는데 시간이 걸리지만)
- 6.multer를 이용한 파일 저장(초기에 그냥 서버에 파일을 저장해도 괜찮겠지??(서버가 무거워짐...) 했지만, storage에 업로드해 따로 관리를 해줘야됨
- 7.video api 이용 방법 및 이벤트(loadeddata,loadedmetadata,canplay,ended,timeupdate 등)에 대한 이해.
- (일단 이정도...더 적어야징...Challenge 진행중)

## Screen Shot

<img width="1440" alt="스크린샷 2020-02-01 오후 10 19 25" src="https://user-images.githubusercontent.com/30601503/73594725-5db60200-4554-11ea-95ea-5b7343e0e7ba.png">
<img width="1440" alt="스크린샷 2020-02-01 오후 10 19 03" src="https://user-images.githubusercontent.com/30601503/73594726-5db60200-4554-11ea-8587-81c025e4d46b.png">
<img width="1440" alt="스크린샷 2020-02-01 오후 10 20 26" src="https://user-images.githubusercontent.com/30601503/73594723-5db60200-4554-11ea-8ef8-6a97a9ef8fb8.png">
<img width="1440" alt="스크린샷 2020-02-01 오후 10 19 46" src="https://user-images.githubusercontent.com/30601503/73594724-5db60200-4554-11ea-86cb-3d5c6b9e4a10.png">
