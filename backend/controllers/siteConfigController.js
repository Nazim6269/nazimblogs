import asyncHandler from 'express-async-handler';
import SiteConfig from '../models/siteConfigModel.js';

// @desc    Get site configuration
// @route   GET /api/site-config
// @access  Public
const getSiteConfig = asyncHandler(async (req, res) => {
    let config = await SiteConfig.findOne({});
    if (!config) {
        config = await SiteConfig.create({});
    }
    res.json(config);
});

// @desc    Update site configuration
// @route   PUT /api/site-config
// @access  Admin
const updateSiteConfig = asyncHandler(async (req, res) => {
    let config = await SiteConfig.findOne({});
    if (!config) {
        config = await SiteConfig.create({});
    }

    if (req.body.navbar) {
        config.navbar = { ...config.navbar.toObject(), ...req.body.navbar };
    }
    if (req.body.hero) {
        config.hero = { ...config.hero.toObject(), ...req.body.hero };
    }
    if (req.body.footer) {
        config.footer = { ...config.footer.toObject(), ...req.body.footer };
    }

    const updatedConfig = await config.save();
    res.json(updatedConfig);
});

export { getSiteConfig, updateSiteConfig };
