/* eslint-disable */
const Url = require('../model/UrlModel');

exports.isRecommended = async (req, res, next) => {
    if (!req.body.recommended) return next();
    const doc = await Url.findById(req.params.VideoId);
    doc.recommendedNos++;
    
    await Url.findByIdAndUpdate(req.params.VideoId, { recommended: req.body.recommended},{new: true, runValidators : true});
    res.status(200).send('recom');
};
exports.getVideos = async(req, res, next) => {
    
    const videos = await Url.find(req.query);
    res.status(200).json({
        status: 'success',
        message:'complete video details',
        videos
    });
}
exports.getVideosIds = async (req, res, next) => {
    const videos = await Url.find();
    let videoIds = [];
    videos.forEach( el => {
        videoIds.push(el.submittedVideoIds);
    })
    console.log(videoIds);
    res.status(200).json({
        status: 'success',
        message: 'videosids',
        data:{
            videoIds
        }
    });
    // next();
}

