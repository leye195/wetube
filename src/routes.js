// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";

// videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// github
const GB_LOGIN = "/auth/github";
const GB_CALLBACK = "/auth/github/callback";

// naver
const NAVER_LOGIN = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// kakao
const KAKAO_LOGIN = "/auth/kako";
const KAKAO_CALLBACK = "/auth/kakao/callback";

//API
const API = "/api";
const UNLIKE_COMMENT = "/comment/:id/unlike";
const LIKE_COMMENT = "/comment/:id/like";
const REPLY = "/comment/:id/reply";
const REGISTER_VIEW = "/:id/view"; //video view
const LIKE = "/:id/like";
const UNLIKE = "/:id/unlike";
const ADD_COMMENT = "/:id/comment"; //add comment
const DELETE_COMMENT = "/:id/comment/:cid"; //delete comment
const BANNER = "/banner";
const SUBSCRIBE = "/:id/subscribe";
const DESCRIPTION = "/description";
const LINK = "/link";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  userDetail: id => {
    if (id) return `/users/${id}`;
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) return `/videos/${id}`;
    return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) return `/videos/${id}/edit`;
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) return `/videos/${id}/delete`;
    return DELETE_VIDEO;
  },
  github: GB_LOGIN,
  githubCallback: GB_CALLBACK,
  naver: NAVER_LOGIN,
  naverCallback: NAVER_CALLBACK,
  kakao: KAKAO_LOGIN,
  kakaoCallback: KAKAO_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
  like: LIKE,
  unlike: UNLIKE,
  banner: BANNER,
  subscribe: SUBSCRIBE,
  description: DESCRIPTION,
  link: LINK,
  likeComment: LIKE_COMMENT,
  unlikeComment: UNLIKE_COMMENT,
  reply: REPLY
};
export default routes;
