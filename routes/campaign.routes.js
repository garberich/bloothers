let express = require('express');
let router = express.Router();

let campaignController = require('../controllers/campaign.controller');

router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaigns);
router.post('/', campaignController.createCampaign);

module.exports = router;