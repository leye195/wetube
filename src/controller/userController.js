import routes from "../routes";
import passport from "passport";
import User from "../models/user";
import userModel from "../models/user";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const { name, email, password1, password2 } = req.body;
  if (password1 !== password2) {
    req.flash("error", "Password don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password1); //User Object,password
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

//local 로그인
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  successFlash: `Login Success`,
  failureFlash: "Login Failed Check your Email or Password"
});
//github login
export const githubLogin = passport.authenticate("github", {
  successFlash: "Login Success",
  failureFlash: "Login Failed Check your Email or Password"
});
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
//naver login
export const naverLogin = passport.authenticate("naver", {
  successFlash: "Login Success",
  failureFlash: "Login Failed Check your Email or Password"
});
export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: { email, nickname, id, profile_image: avatarUrl }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    } else {
      let name = "NO one";
      if (nickname !== undefined) name = nickname;
      const newUser = await User.create({
        email,
        name,
        naverId: id,
        avatarUrl
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};
export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};
//kakao login
export const kakaoLogin = passport.authenticate("kakao", {
  successFlash: "Login Success",
  failureFlash: "Login Failed Check your Email or Password"
});
export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: {
      id,
      properties: { nickname, profile_image },
      kakao_account: { email }
    }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    } else {
      const newUser = await User.create({
        email,
        name: nickname,
        avatarUrl: profile_image,
        kakaoId: id
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};
export const postkakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged Out, See you later");
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => {
  res.render("users", { pageTitle: "Users" });
};

//edit user
export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit User" });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  console.log(file);
  try {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { name, email, avatarUrl: file ? file.location : req.user.avatarUrl }
    );
    req.flash("success", "Profile Updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Profile Update Failed");
    res.redirect(routes.editProfile);
  }
};

//change password
export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword1, newPassword2 }
  } = req;
  try {
    if (newPassword1 === newPassword2) {
      await req.user.changePassword(oldPassword, newPassword1);
      res.redirect(routes.me);
    } else {
      req.flash("error", "Password don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const getMe = async (req, res) => {
  const user = await userModel.findById(req.user._id).populate("videos");
  res.render("userDetail", { pageTitle: "Me | User Detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    //populate()를 이용해 다른 document의 ObjectId를 실제 객체로 치환
    const user = await User.findOne({ _id: id }).populate({
      path: "videos",
      populate: {
        path: "creator",
        model: userModel //nested
      }
    });
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User Not Found");
    res.redirect(routes.home);
  }
};
export const postBanner = async (req, res) => {
  const { file, user } = req;
  console.log(file);
  try {
    user.bannerUrl = file.location;
    user.save();
    res.status(200).redirect(routes.me);
  } catch (error) {
    res.status(400).redirect(routes.me);
  }
};
