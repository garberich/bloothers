let express = require('express');
let router = express.Router();

let DonationTypeController = require('../controllers/donation_type.controller');

router.get('/:id', DonationTypeController.getDonationType);
router.post('/', DonationTypeController.createDonationType);

module.exports = router;