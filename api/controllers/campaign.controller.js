let campaignModel = require('../models/campaign');

const campaignController = {};

campaignController.getCampaign = async(req, res) => {
    await campaignModel.findById(req.params.id).exec((err, campaignFind) => {
        if (err) return res.status(500).json({ status: 'error in the request' });

        return res.status(200).json({ campaignFind });
    });
};

campaignController.getCampaigns = (req, res) => {
    campaignModel.find({ status: "true" }).exec((err, campaignsFind) => {
        if (err) return res.status(500).json({ status: 'error in the request' });

        return res.status(200).json({ campaignsFind });
    });
};

campaignController.createCampaign = (req, res) => {
    let campaign = new campaignModel(req.body);

    campaign.save();

    return res.status(200).json({ status: 'Campaign save' });
}

module.exports = campaignController;