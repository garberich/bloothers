const achievement = require('../controllers/achievement.controller');
const express = require('express');
const router = express.Router();

router.get('/:id', achievement.getAchievement);
router.get('/', achievement.getAchievements);
router.post('/', achievement.createAchievement);
router.put('/:id', achievement.editAchievement);
router.delete('/:id', achievement.deleteAchievement);
router.get('/download-medal/:id', achievement.downloadMedal);

module.exports = router;