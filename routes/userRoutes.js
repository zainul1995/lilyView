const express = require('express');
const userController = require('../controllers/userController');
const urlController = require('../controllers/urlController');

const userRouter = express.Router();


userRouter.route('/signup').post(userController.signup);
userRouter
  .route('/login')
  .get(userController.protect)
  .post(userController.login);

userRouter.route('/:VideoId/recommendvideo').patch(urlController.isRecommended);
userRouter.use(userController.protect);

userRouter.route('/me').get(userController.getMe);
userRouter.route('/upload-video').patch(userController.submitUrl);
userRouter.route('/view/videos').get(urlController.getVideos);
userRouter.route('/updatepoints').patch(userController.updatePoints);
userRouter.route('/logout').get(userController.logout);


module.exports = userRouter;
