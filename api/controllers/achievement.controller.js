let achievementModel = require('../models/achievement');
var path = require('path');
var fs = require('fs');

let achievementController = {};

// Find only one Achievement filtering by id
// This no validate "status"
achievementController.getAchievement = async(req, res) => {
    let achievement = await achievementModel.findById(req.params.id).exec((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        return res.status(200).json({ achievement });
    })
};

// Find all achievements where "status" is true
achievementController.getAchievements = (req, res) => {
    achievementModel.find({ status: true }).exec((err, achievements) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        return res.status(200).json({ achievements });
    })
};

achievementController.createAchievement = (req, res) => {
    const achievement = new achievementModel(req.body);

    achievement.save((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });
        res.status(200).json({ status: 'Achievement save' });
    });
};

achievementController.editAchievement = async(req, res) => {
    let idAchievement = req.params.id;
    let achievement = {
        name: req.body.name,
        description: req.body.description,
        medal: req.body.medal,
        points: req.body.points,
        finish_date: req.body.finish_date
    }

    await achievementModel.findByIdAndUpdate(idAchievement, { $set: achievement });
    res.status(200).json({ status: 'Achievement update' });
};

achievementController.deleteAchievement = async(req, res) => {
    await achievementModel.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        return res.status(200).json({ status: 'Achievement Deleted' });
    });
};

achievementController.downloadMedal = async(req, res) => {
    let achievement = await achievementModel.findById(req.params.id);

    fs.exists(achievement.medal, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(achievement.medal));
        } else {
            res.status(200).json({ status: 'Medal not found' });
        }
    });
};

module.exports = achievementController;