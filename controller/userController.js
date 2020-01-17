import routes from "../routes";

export const getJoin=(req,res)=>{
    res.render("join",{pageTitle:"Join"});
}
export const postJoin=(req,res)=>{
    const {name,email,password1,password2}=req.body;
    if(password1!==password2){
        res.status(400);
        res.render("join",{pageTitle:"Join"});
    }else{
        //user register - >  user login 
        res.redirect(routes.home);
    }
    
}
export const getLogin=(req,res)=>{
    res.render("login",{pageTitle:"Login"});
}
export const postLogin=(req,res)=>{
    //Check user password 
    res.redirect(routes.home);
}
export const logout=(req,res)=>{
    res.redirect(routes.home);
}
export const users=(req,res)=>{
    res.render("users",{pageTitle:"Users"});
}
export const editProfile=(req,res)=>{
    res.render("editProfile",{pageTitle:"Edit User"});
}  
export const changePassword=(req,res)=>{
    res.render("changePassword",{pageTitle:"Change Password"});
}
export const userDetail=(req,res)=>{
    res.render("userDetail",{pageTitle:"User Detail"});
}

