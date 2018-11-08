let campaignModel = require('../models/campaign');
const fs = require('fs');
const path = require('path');

const campaignController = {};

// Find only one Campaign filtering by id
// this no validate "status"
campaignController.getCampaign = async(req, res) => {
    await campaignModel.findById(req.params.id).exec((err, campaignFind) => {
        if (err) return res.status(500).json({ status: 'error in the request' });

        return res.status(200).json({ campaignFind });
    });
};

// Find alls Campaigns whit "status" true
campaignController.getCampaigns = (req, res) => {
    campaignModel.find({ status: "true" }).exec((err, campaignsFind) => {
        if (err) return res.status(500).json({ status: 'error in the request' });

        return res.status(200).json({ campaignsFind });
    });
};

// Create a new Campaign
campaignController.createCampaign = (req, res) => {
    let campaign = new campaignModel(req.body);

    campaign.save();

    return res.status(200).json({ status: 'Campaign save' });
}

// Delete an existing Campaign
campaignController.deleteCampaign = (req, res) => {
    campaignModel.findByIdAndRemove(req.params.id).exec((err) => {
        if (err) return res.status(500).json({ status: 'Error in the request' });

        return res.status(200).json({ status: 'Campaign deleted' });
    })
}

// Upload images for a Camapign
campaignController.uploadImages = async(req, res) => {
    let campaignId = req.params.id;

    if (req.files) {

        var file_path = "";
        var file_split = "";
        var file_name = "";
        var ext_split = "";
        var file_ext = "";

        let campaignFind = await campaignModel.findById(campaignId);

        let totalImages = (req.files.image.length) ? req.files.image.length : 1;

        for (let index = 0; index < totalImages; index++) {

            file_path = (totalImages === 1) ? req.files.image.path : req.files.image[index].path;

            file_split = file_path.split('\\');
            file_name = file_split[2];
            ext_split = file_name.split('\.');
            file_ext = ext_split[1];

            // var new_path = `${file_split[0]}\\${file_split[1]}\\${campaignFind._id}\\${file_name}`;
            var new_path = `${file_split[0]}\\${file_split[1]}\\images\\${file_name}`;

            //El usuario que se recibe por la URL debe ser el mismo del objeto del token; el usuario identificado
            // if (campaignId != req.user.sub) {
            // 	return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
            // }

            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg') {
                renameFiles(res, file_path, new_path);
                campaignFind.images.push(file_name);
            } else {
                return removeFilesOfUploads(res, file_path, 'Extension is no valid');
            }
        }

        campaignFind.save((err, campaignFind) => {
            if (err) return removeFilesOfUploads(res, file_path, 'Error in the request');

            if (!campaignFind) return res.status(404).send({ status: 'No is possible update the campaign' });

            return res.status(200).json({ campaign: campaignFind });
        });
    } else {
        return res.status(200).json({ status: 'Images no send' });
    }
};

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).json({ status: message });
    });
};

function renameFiles(res, old_path, new_path) {
    fs.rename(old_path, new_path, (err) => {
        if (err) {
            return removeFilesOfUploads(res, old_path, 'Is not possible save the image');
        }
    });
}

campaignController.downloadImages = (req, res) => {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/campaign_images/' + imageFile;

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).json({ status: 'Avatar not found' });
        }
    });
};

module.exports = campaignController;