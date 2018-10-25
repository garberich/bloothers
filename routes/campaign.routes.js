let express = require('express');
let router = express.Router();

let campaignController = require('../controllers/campaign.controller');

let multiparty = require('connect-multiparty');
let md_upload = multiparty({ uploadDir: './uploads/campaign_images' });

router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaigns);
router.post('/', campaignController.createCampaign);
router.post('/upload-images/:id', md_upload, campaignController.uploadImages);

module.exports = router;