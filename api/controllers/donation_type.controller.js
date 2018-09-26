const donationTypemodel = require('../models/donation_type');
const campaignModel = require('../models/campaign');

const donationTypeController = {};

// Find only one Donation Type register.
// This no filter by "status".
// If Donation Type have a campaign so return the Campaign to
donationTypeController.getDonationType = (req, res) => {
    donationTypemodel.findById(req.params.id).exec((err, donationTypeFind) => {
        if (err) return res.status(500).json({ status: 'error in the request' });

        // return res.status(200).json({ campaign: donationTypeFind.id_campaign });
        if (donationTypeFind.id_campaign) {
            console.log('entró');
            getCampaign(donationTypeFind.id_campaign).then((campaignFind) => {

                return res.status(200).json({
                    donationType: donationTypeFind,
                    campaign: campaignFind
                });
            });
        } else {
            return res.status(200).json({ donationTypeFind });
        };
    });
};

async function getCampaign(idCampaign) {
    return await campaignModel.findById(idCampaign).exec()
        .then((campaignFind) => {
            return campaignFind;
        })
        .catch((err) => {
            return handleError(err)
        });
};

donationTypeController.createDonationType = (req, res) => {
    let donationType = new donationTypemodel(req.body);

    donationType.save();
    res.status(200).json({ status: 'Donation Type save' });
};

module.exports = donationTypeController;