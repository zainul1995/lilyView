/* eslint-disable */
const express = require('express');
const userController = require('./userController');
const viewController = require('./viewController');

const viewRouter = express.Router();


viewRouter.route('/').get(viewController.getOverview);

viewRouter.route('/signup').get(viewController.getSignUpForm);
// viewRouter.use(userController.protect);
viewRouter.route('/login').get(userController.protect, viewController.getLoginForm)
viewRouter.route('/dashboard').get(viewController.getDashBoard);
viewRouter.route('/view-videos').get(viewController.getVideoScreen);
viewRouter.route('/upload-video').get(viewController.getUploadScreen);
viewRouter.route('/logout').get(userController.logout)

module.exports = viewRouter;
