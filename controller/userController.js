import routes from "../routes";
import passport from "passport";
import User from "../models/user";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const { name, email, password1, password2 } = req.body;
  if (password1 !== password2) {
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

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login
});
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //console.log(profile, cb);
  const {
    _json: { id, avatar_url, name, email }
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
      user,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => {
  res.render("users", { pageTitle: "Users" });
};
export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit User" });
};
export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail" });
};
