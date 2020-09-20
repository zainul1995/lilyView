/* eslint-disable */
const express = require('express');
const userController = require('../controllers/userController');
const viewController = require('../controllers/viewController');
const app = require('../app');

const viewRouter = express.Router();


viewRouter.route('/').get(viewController.getOverview);

viewRouter.route('/signup').get(viewController.getSignUpForm);
// viewRouter.use(userController.loginProtect);
viewRouter.route('/login').get( userController.loginProtect, viewController.getLoginForm);

// viewRouter.use(userController.protect);
viewRouter.route('/dashboard').get(userController.protect, viewController.getDashBoard);
viewRouter.route('/view-videos').get(userController.protect, viewController.getVideoScreen);
viewRouter.route('/upload-video').get(userController.protect, viewController.getUploadScreen);
viewRouter.route('/logout').get(userController.protect, userController.logout);

module.exports = viewRouter;
