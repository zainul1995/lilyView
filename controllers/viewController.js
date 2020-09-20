/* eslint-disable*/
const User = require('../model/UserModel');


exports.getOverview = (req, res) => {
    res.status(200).render('overview',{
        title: 'lilyViews'
    });
};

// exports.getLoginForm = (req, res) => {
//     console.log(res.locals.user);
//     console.log(req.user);
//     if(res.locals.user == undefined){
//         return res.status(200).render('login',{
//             title: 'LogIn'
//         });
//     } 
//     res.status(200).render('dashboard');
// };
exports.getLoginForm = (req, res) => {
    if(res.locals.user == undefined){
        return res.status(200).render('login',{
            title: 'LogIn'
        });
    } 
    
   return res.redirect('/dashboard');
};







exports.getSignUpForm = (req, res) => {
    res.status(200).render('signup',{
        title: 'signup'
    });
};

exports.getDashBoard = (req, res) => {
    res.status(200).render('dashboard')
}

exports.getVideoScreen = (req, res) => {
    res.status(200).render('video-watch');
}
exports.getUploadScreen = (req, res) => {
    res.status(200).render('upload-screen');
}
