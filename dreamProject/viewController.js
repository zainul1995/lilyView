/* eslint-disable*/
const User = require('./UserModel');


exports.getOverview = (req, res) => {
    res.status(200).render('mainpage',{
        title: 'lilyViews'
    });
};

exports.getLoginForm = (req, res) => {
    if(!req.user){
        res.status(200).render('login',{
            title: 'LogIn'
        });
    } 
    res.status(200).render('dashboard');
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
    if(!req.user){
        res.status(200).render('mainpage',{
            title: 'lilyViews'
        }) 
    }
    res.status(200).render('video-screen');
}
exports.getUploadScreen = (req, res) => {
    res.status(200).render('upload-screen');
}
