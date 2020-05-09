const express = require('express');
const userController = require('./userController');
const urlController = require('./urlController');

const userRouter = express.Router();

// userRouter.route('/allusers').get(userController.getAll);
userRouter.route('/signup').post(userController.signup);
userRouter
  .route('/login')
  .get(userController.protect, userController.getMe)
  .post(userController.login);
// userRouter.route('/upload').post(userController.uploadTourImages, userController.resizeTourImages);
// userRouter.route('/dephla').post(userController.middleWareOne, userController.middleWareTwo, userController.middleWareThree);
// userRouter.route('/view/videos').get(urlController.getVideosIds)
// userRouter.route('/view/videos').get(urlController.getVideos)
userRouter.route('/:VideoId/recommendvideo').patch(urlController.isRecommended);
userRouter.use(userController.protect);
// userRouter.route('/:id/view/videos').get(urlController.getVideosIds)
userRouter.route('/me').get(userController.getMe);
userRouter.route('/upload-video').patch(userController.submitUrl);
userRouter.route('/view/videos').get(urlController.getVideos);
userRouter.route('/updatepoints').patch(userController.updatePoints);
userRouter.route('/logout').get(userController.logout);

// patch(userController.uploadTourImages, userController.resizeTourImages, userController.updateData)
module.exports = userRouter;
